"use client";

import { useState,  useEffect } from "react";
import { db, auth } from "@/firebase/firebase";
import { doc, setDoc, getDoc  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Header from "../Header/index";
import { onAuthStateChanged } from "firebase/auth";
import { FiUser } from "react-icons/fi"
import { MdWorkOutline, MdUploadFile } from "react-icons/md"
import { FaChartLine, FaFileInvoiceDollar } from "react-icons/fa"
import { BiMinusCircle } from "react-icons/bi"
import { HiArrowRight } from "react-icons/hi";
import toast from "react-hot-toast";
// import auth
// import { userAgent } from "next/server";

interface FormData {
  fullName: string;
  fatherName: string;
  address: string;
  cnic: string;
  email: string;
  phone: string;
  employer: string;
  ntn: string;
  salary: string | number;
  otherIncome: string | number;
  iban: string;
  salaryTaxDeducted: string | number;
  rentalIncome: string | number;
  businessIncome: string | number;
  capitalGains: string | number;
  foreignIncome: string | number;
  zakat: string | number;
  donations: string | number;
  medicalExpenses: string | number;
  educationExpenses: string | number;
  propertyDetails: string;
  vehicles: string;
  bankBalances: string | number;
  investments: string;
}

export default function Index() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState<FormData>({
    fullName: "",
    fatherName: "",
    address: "",
    cnic: "",
    email: "",
    phone: "",
    employer: "",
    ntn: "",
    salary: "",
    otherIncome: "",
    iban: "",
    salaryTaxDeducted: "",
    rentalIncome: "",
    businessIncome: "",
    capitalGains: "",
    foreignIncome: "",
    zakat: "",
    donations: "",
    medicalExpenses: "",
    educationExpenses: "",
    propertyDetails: "",
    vehicles: "",
    bankBalances: "",
    investments: ""
  });

  const [files, setFiles] = useState<{
    cnicFront: File | null;
    cnicBack: File | null;
    salarySlip: File | null;
    taxCertificate: File | null;
    assetDocs?: FileList | null;
  }>({
    cnicFront: null,
    cnicBack: null,
    salarySlip: null,
    taxCertificate: null,
    assetDocs: null,
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUserData = () => {
  //     const userRef = doc(db, "credentials", user.uid)
  //     const snapshot = getDoc(userRef);
  //   }
  // })
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {
      if (currentUser) {
        setUser(currentUser);

        const userRef = doc(db, "credentials", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm((prevForm) => ({
            ...prevForm,
            fullName: data?.fullName || "",
            fatherName: data?.fatherName || "",
            address: data?.address || "",
            cnic: data?.cnic || "",
            email: data?.email || "",
            phone: data?.phone || "",
            employer: data?.employer || "",
            ntn: data?.ntn || "",
            salary: data?.salary || "",
            otherIncome: data?.otherIncome || "",
            iban: data?.iban || "",
            salaryTaxDeducted: data?.salaryTaxDeducted || "",
            rentalIncome: data?.rentalIncome || "",
            businessIncome: data?.businessIncome || "",
            capitalGains: data?.capitalGains || "",
            foreignIncome: data?.foreignIncome || "",
            zakat: data?.zakat || "",
            donations: data?.donations || "",
            medicalExpenses: data?.medicalExpenses || "",
            educationExpenses: data?.educationExpenses || "",
            propertyDetails: data?.propertyDetails || "",
            vehicles: data?.vehicles || "",
            bankBalances: data?.bankBalances || "",
            investments: data?.investments || "",
          }));
        }
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: uploaded } = e.target;
    if (uploaded && uploaded.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: uploaded.length > 1 ? uploaded : uploaded[0] }));
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');

    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uploadedFiles: {
        cnicFrontURL?: string;
        cnicBackURL?: string;
        salarySlipURL?: string;
        taxCertificateURL?: string;
        assetDocsURLs?: string[];
      } = {};
  
      if (files.cnicFront) {
        uploadedFiles.cnicFrontURL = await uploadToCloudinary(files.cnicFront);
      }
  
      if (files.cnicBack) {
        uploadedFiles.cnicBackURL = await uploadToCloudinary(files.cnicBack);
      }
  
      if (files.salarySlip) {
        uploadedFiles.salarySlipURL = await uploadToCloudinary(files.salarySlip);
      }
  
      if (files.taxCertificate) {
        uploadedFiles.taxCertificateURL = await uploadToCloudinary(files.taxCertificate);
      }
  
      if (files.assetDocs && files.assetDocs.length > 0) {
        const assetUploads = await Promise.all(
          Array.from(files.assetDocs).map(file => uploadToCloudinary(file))
        );
        uploadedFiles.assetDocsURLs = assetUploads.filter(Boolean);
      }
  
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }
  
      // Save form and uploaded URLs to Firestore
      const userRef = doc(db, "credentials", user.uid); // correct usage
      await setDoc(userRef, {
        ...form,
        ...uploadedFiles,
        submittedAt: new Date().toISOString(),
      }, { merge: true });
  
      toast.success("Form submitted successfully.");
      // alert("success!")
  
      // Reset form
      setForm({
        fullName: "",
        fatherName: "",
        address: "",
        cnic: "",
        email: "",
        phone: "",
        employer: "",
        ntn: "",
        salary: "",
        otherIncome: "",
        iban: "",
        salaryTaxDeducted: "",
        rentalIncome: "",
        businessIncome: "",
        capitalGains: "",
        foreignIncome: "",
        zakat: "",
        donations: "",
        medicalExpenses: "",
        educationExpenses: "",
        propertyDetails: "",
        vehicles: "",
        bankBalances: "",
        investments: "",
      });
  
      setFiles({
        cnicFront: null,
        cnicBack: null,
        salarySlip: null,
        taxCertificate: null,
        assetDocs: null,
      });
  
    } catch (err) {
      console.error("Submission Error:", err);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-[#fafafa]">
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-10">
        <h2 className="text-2xl font-bold text-gray-800">Personal Tax Filing — 2025</h2>
        <p className="text-sm text-gray-600 mt-[10px]">
          Fill in as much information as you can. If you're unsure, leave it blank — our tax expert will follow up with you.
        </p>

        {/* Section: Personal Details */}
        <section className="mt-[30px]">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-2"><span className="mr-2"><FiUser color="#191919"/></span>Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name (as per CNIC)</label>
              <input name="fullName" placeholder="Ahmed Ali" value={form.fullName} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Father's Name</label>
              <input name="fatherName" placeholder="Amir Ali" value={form.fatherName} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">CNIC (e.g. 35202-1234567-1)</label>
              <input name="cnic" placeholder="35202-9994535-3" value={form.cnic} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">NTN (if you have one)</label>
              <input name="ntn" placeholder="9876543-0" value={form.ntn} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email Address</label>
              <input name="email" type="email" placeholder="someone@example.com" value={form.email} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Mobile Number</label>
              <input name="phone" type="tel" placeholder="+923341234569" value={form.phone} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Residential Address</label>
              <input name="address" placeholder="DHA, Karachi" value={form.address} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Bank IBAN</label>
              <input name="iban" placeholder="PK36SCBL0000001123456702" value={form.iban} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
          </div>
        </section>


        {/* Section: Employment */}
        <section className="mt-[30px]">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-2"><span className="mr-2"><MdWorkOutline color="#191919" /></span>Employment Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Employer Name</label>
              <input name="employer" placeholder="M Zuhair Hasan" value={form.employer} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Annual Salary (PKR)</label>
              <input name="salary" type="number" placeholder="2400000" value={form.salary ?? ""} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Tax Already Deducted (PKR)</label>
              <input name="salaryTaxDeducted" type="number" placeholder="150000" value={form.salaryTaxDeducted} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
          </div>
        </section>


        {/* Section: Other Income */}
        <section className="mt-[30px]">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-2"><span className="mr-2"><FaChartLine color="#191919" /></span>Other Sources of Income</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Rental Income (PKR)</label>
              <input name="rentalIncome" type="number" placeholder="120000" value={form.rentalIncome} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Business/Consulting Income (PKR)</label>
              <input name="businessIncome" type="number" placeholder="5000000" value={form.businessIncome} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Capital Gains (PKR)</label>
              <input name="capitalGains" type="number" placeholder="3450435" value={form.capitalGains} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Foreign Income (PKR)</label>
              <input name="foreignIncome" type="number" placeholder="3500000" value={form.foreignIncome} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
          </div>
        </section>


        {/* Section: Deductions */}
        <section className="mt-[30px]">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-2"><span className="mr-2"><FaFileInvoiceDollar color="#191919"/></span>Deductions & Exemptions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Zakat Paid (PKR)</label>
              <input name="zakat" type="number" placeholder="950000" value={form.zakat} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Charity Donations (PKR)</label>
              <input name="donations" type="number" placeholder="50000" value={form.donations} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Medical Expenses (PKR)</label>
              <input name="medicalExpenses" type="number" placeholder="110000" value={form.medicalExpenses} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Children's Education (PKR)</label>
              <input name="educationExpenses" type="number" placeholder="220000" value={form.educationExpenses} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
          </div>
        </section>


        {/* Section: Assets */}
        <section className="mt-[30px]">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-2"><span className="mr-2"><BiMinusCircle color="#191919" /></span>Asset Declaration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Property (Address, Value)</label>
              <input name="propertyDetails" placeholder="123 Main St, Karachi – PKR 15,000,000" value={form.propertyDetails} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Vehicles (Make, Model)</label>
              <input name="vehicles" placeholder="Toyota Corolla 2021" value={form.vehicles} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Total Bank Balance (PKR)</label>
              <input name="bankBalances" type="number" placeholder="15000000" value={form.bankBalances} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Investments (Funds, Shares)</label>
              <input name="investments" placeholder="Meezan Mutual Fund - PKR 500,000" value={form.investments} onChange={handleInput} className="input bg-[#fafafa] rounded-lg py-2 px-3 w-full text-[14px]" />
            </div>
          </div>
        </section>


        {/* Section: Upload Documents */}
        <section className="mt-[30px]">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-2"><span className="mr-2"><MdUploadFile color="#191919" /></span>Document Uploads</h3>
          <p className="text-sm text-gray-600 mb-2">You can skip any document for now; we’ll follow up.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">CNIC (Front)</label>
              <input name="cnicFront" type="file" onChange={handleFile} className="file-input" />
            </div>
            <div>
              <label className="block text-sm font-medium">CNIC (Back)</label>
              <input name="cnicBack" type="file" onChange={handleFile} className="file-input" />
            </div>
            <div>
              <label className="block text-sm font-medium">Salary Certificate / Slip</label>
              <input name="salarySlip" type="file" onChange={handleFile} className="file-input" />
            </div>
            <div>
              <label className="block text-sm font-medium">Tax Deduction Certificate</label>
              <input name="taxCertificate" type="file" onChange={handleFile} className="file-input" />
            </div>
            <div>
              <label className="block text-sm font-medium">Asset Documents (if any)</label>
              <input name="assetDocs" type="file" multiple onChange={handleFile} className="file-input" />
            </div>
          </div>
        </section>


        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="group w-full mt-6 bg-[#f18021] text-white px-6 py-2 rounded-3xl hover:bg-[#d96c14] font-semibold flex items-center justify-center gap-2 transition-all duration-200"
        >
          {loading ? "Submitting..." : (
            <>
              Submit Filing
              <HiArrowRight
                size={18}
                className="transform transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
    </div>

  );
}
