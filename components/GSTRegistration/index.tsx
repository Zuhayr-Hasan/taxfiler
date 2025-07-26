"use client";

import { useState } from "react";
import { db, storage } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

export default function index() {
  const [form, setForm] = useState({
    fullName: "",
    cnic: "",
    email: "",
    phone: "",
    businessName: "",
    businessAddress: "",
    ntn: "",
    businessType: "",
  });

  const [files, setFiles] = useState({
    cnic: null as File | null,
    utilityBill: null as File | null,
    ownershipProof: null as File | null,
    letterhead: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: uploaded } = e.target;
    if (uploaded?.[0]) {
      setFiles((prev) => ({ ...prev, [name]: uploaded[0] }));
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const fileRef = ref(storage, `gst-registration/${path}-${uuid()}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const cnicURL = files.cnic ? await uploadFile(files.cnic, "cnic") : "";
      const billURL = files.utilityBill ? await uploadFile(files.utilityBill, "utility-bill") : "";
      const ownershipURL = files.ownershipProof ? await uploadFile(files.ownershipProof, "ownership") : "";
      const letterheadURL = files.letterhead ? await uploadFile(files.letterhead, "letterhead") : "";

      await addDoc(collection(db, "gstRegistrations"), {
        ...form,
        submittedAt: new Date().toISOString(),
        documents: {
          cnic: cnicURL,
          utilityBill: billURL,
          ownershipProof: ownershipURL,
          letterhead: letterheadURL,
        },
      });

      alert("GST Registration submitted successfully!");
      setForm({
        fullName: "",
        cnic: "",
        email: "",
        phone: "",
        businessName: "",
        businessAddress: "",
        ntn: "",
        businessType: "",
      });
      setFiles({ cnic: null, utilityBill: null, ownershipProof: null, letterhead: null });
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">GST Registration Form</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="fullName" onChange={handleInput} value={form.fullName} placeholder="Full Name" className="input" />
        <input name="cnic" onChange={handleInput} value={form.cnic} placeholder="CNIC" className="input" />
        <input name="email" onChange={handleInput} value={form.email} placeholder="Email" className="input" />
        <input name="phone" onChange={handleInput} value={form.phone} placeholder="Phone Number" className="input" />
        <input name="businessName" onChange={handleInput} value={form.businessName} placeholder="Business Name" className="input" />
        <input name="businessAddress" onChange={handleInput} value={form.businessAddress} placeholder="Business Address" className="input" />
        <input name="ntn" onChange={handleInput} value={form.ntn} placeholder="NTN" className="input" />
        <select name="businessType" value={form.businessType} onChange={handleInput} className="input">
          <option value="">Select Business Type</option>
          <option value="Individual">Individual</option>
          <option value="Partnership">Partnership</option>
          <option value="Private Limited">Private Limited</option>
        </select>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload CNIC</label>
          <input name="cnic" type="file" onChange={handleFile} className="file-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Utility Bill</label>
          <input name="utilityBill" type="file" onChange={handleFile} className="file-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Rent Agreement / Ownership Proof</label>
          <input name="ownershipProof" type="file" onChange={handleFile} className="file-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Business Letterhead</label>
          <input name="letterhead" type="file" onChange={handleFile} className="file-input" />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-[#f18021] text-white px-6 py-3 rounded hover:bg-orange-600 font-semibold"
      >
        {loading ? "Submitting..." : "Submit Registration"}
      </button>
    </div>
  );
}
