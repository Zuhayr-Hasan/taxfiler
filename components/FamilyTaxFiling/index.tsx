'use client';

import { useState, useEffect } from 'react';
import Header from '../Header/index';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db, auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { HiArrowRight } from 'react-icons/hi';
import { User } from 'firebase/auth';

function FamilyTaxFiling() {
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    email: '',
    phone: '',
    address: '',
    ntn: '',
    maritalStatus: '',
    spouseName: '',
    spouseCnic: '',
    dependents: [{ name: '', cnic: '', relation: '', age: '' }],
    salaryIncome: '',
    businessIncome: '',
    rentalIncome: '',
    foreignIncome: '',
    capitalGains: '',
    otherIncome: '',
    zakat: '',
    donations: '',
    medicalExpenses: '',
    educationExpenses: '',
    bankAccounts: '',
    propertyDetails: '',
    vehicleDetails: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      if (currentUser) {
        // setUser(currentUser); // Removed as per edit hint

        const userRef = doc(db, "credentials", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData((prevForm) => ({
            ...prevForm,
            fullName: data?.fullName || "",
            cnic: data?.cnic || "",
            email: data?.email || "",
            phone: data?.phone || "",
            address: data?.address || "",
            ntn: data?.ntn || "",
            maritalStatus: data?.maritalStatus || "",
            spouseName: data?.spouseName || "",
            spouseCnic: data?.spouseCnic || "",
            dependents: data?.dependents || [{ name: "", cnic: "", relation: "", age: "" }],
            salaryIncome: data?.salaryIncome || "",
            businessIncome: data?.businessIncome || "",
            rentalIncome: data?.rentalIncome || "",
            foreignIncome: data?.foreignIncome || "",
            capitalGains: data?.capitalGains || "",
            otherIncome: data?.otherIncome || "",
            zakat: data?.zakat || "",
            donations: data?.donations || "",
            medicalExpenses: data?.medicalExpenses || "",
            educationExpenses: data?.educationExpenses || "",
            bankAccounts: data?.bankAccounts || "",
            propertyDetails: data?.propertyDetails || "",
            vehicleDetails: data?.vehicleDetails || "",
          }));
        }
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  type DependentKey = 'name' | 'cnic' | 'relation' | 'age';

  const handleDependentChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updated = [...formData.dependents];
    if (['name', 'cnic', 'relation', 'age'].includes(name)) {
      updated[index][name as DependentKey] = value;
      setFormData(prev => ({ ...prev, dependents: updated }));
    }
  };

  const addDependent = () => {
    setFormData(prev => ({
      ...prev,
      dependents: [...prev.dependents, { name: '', cnic: '', relation: '', age: '' }],
    }));
  };

  const removeDependent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', formData);

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // Save form and uploaded URLs to Firestore
    const userRef = doc(db, "credentials", user.uid); // correct usage
    await setDoc(userRef, {
      ...formData,
      submittedAt: new Date().toISOString(),
    }, { merge: true });

    alert("Form submitted successfully.");
    // const set
    // Send to your route (e.g., /api/submitFamilyTaxData)
  };

  return (
    <div className="min-h-screen ">
      <Header />
      <form onSubmit={handleSubmit} className="mt-[60px] mb-10 max-w-4xl mx-auto p-8 bg-[#fafafa] rounded-3xl border border-gray-200">
        <h2 className="text-2xl font-bold text-black mb-2 text-left">Family Tax Filing Form — 2025</h2>
        <p className="text-left text-gray-500 mb-8 text-[16px]">Please fill out all relevant fields. Your information is kept confidential.</p>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold text-black mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-black mb-1">Full Name</label>
              <input 
                id="fullName"
                value={formData.fullName} 
                name="fullName" 
                placeholder="Akram Ali" 
                onChange={handleChange} 
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" 
              />
            </div>
            <div>
              <label htmlFor="cnic" className="block text-sm font-medium text-black mb-1">CNIC</label>
              <input 
                id="cnic" 
                name="cnic" 
                value={formData.cnic}
                placeholder="12345-1234567-1" 
                onChange={handleChange} 
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email</label>
              <input value={formData.email} id="email" name="email" placeholder="someone@example.com" onChange={handleChange}  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">Phone Number</label>
              <input value={formData.phone} id="phone" name="phone" placeholder="+923311325647" onChange={handleChange}  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-black mb-1">Address</label>
              <input value={formData.address} id="address" name="address" placeholder="House no: 123, DHA, Lahore" onChange={handleChange}  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="ntn" className="block text-sm font-medium text-black mb-1">NTN (Optional)</label>
              <input value={formData.ntn} id="ntn" name="ntn" placeholder="NTN (Optional)" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-black mb-1">Marital Status</label>
              <select id="maritalStatus" name="maritalStatus" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition">
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
            {formData.maritalStatus === 'Married' && (
              <>
                <div>
                  <label htmlFor="spouseName" className="block text-sm font-medium text-black mb-1">Spouse Name</label>
                  <input id="spouseName" name="spouseName" placeholder="Spouse Name" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
                </div>
                <div>
                  <label htmlFor="spouseCnic" className="block text-sm font-medium text-black mb-1">Spouse CNIC</label>
                  <input id="spouseCnic" name="spouseCnic" placeholder="Spouse CNIC" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Dependents */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold text-black mb-4">Dependents</h3>
          {formData.dependents.map((dep, idx) => (
            <div key={idx} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-2 items-end">
              <div>
                <label className="block text-xs font-medium text-black mb-1">Name</label>
                <input name="name" value={dep.name} placeholder="Name" onChange={(e) => handleDependentChange(idx, e)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-black mb-1">CNIC</label>
                <input name="cnic" value={dep.cnic} placeholder="CNIC" onChange={(e) => handleDependentChange(idx, e)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-black mb-1">Relation</label>
                <input name="relation" value={dep.relation} placeholder="Relation" onChange={(e) => handleDependentChange(idx, e)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-black mb-1">Age</label>
                <input name="age" value={dep.age} placeholder="Age" onChange={(e) => handleDependentChange(idx, e)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
              </div>
              <div className="flex items-center h-full">
                <button type="button" onClick={() => removeDependent(idx)} className="text-red-600 hover:text-red-800 underline text-xs ml-2">Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addDependent} className="mt-2 text-gray-700 hover:text-black font-semibold underline text-sm">+ Add Dependent</button>
        </div>

        {/* Income */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold text-black mb-4">Income</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="salaryIncome" className="block text-sm font-medium text-black mb-1">Salary Income</label>
              <input value={formData.salaryIncome} id="salaryIncome" name="salaryIncome" placeholder="Salary Income" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="businessIncome" className="block text-sm font-medium text-black mb-1">Business Income</label>
              <input value={formData.businessIncome} id="businessIncome" name="businessIncome" placeholder="Business Income" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="rentalIncome" className="block text-sm font-medium text-black mb-1">Rental Income</label>
              <input value={formData.rentalIncome} id="rentalIncome" name="rentalIncome" placeholder="Rental Income" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="foreignIncome" className="block text-sm font-medium text-black mb-1">Foreign Income</label>
              <input value={formData.foreignIncome} id="foreignIncome" name="foreignIncome" placeholder="Foreign Income" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="capitalGains" className="block text-sm font-medium text-black mb-1">Capital Gains</label>
              <input value={formData.capitalGains} id="capitalGains" name="capitalGains" placeholder="Capital Gains" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="otherIncome" className="block text-sm font-medium text-black mb-1">Other Income</label>
              <input value={formData.otherIncome} id="otherIncome" name="otherIncome" placeholder="Other Income" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold text-black mb-4">Deductions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="zakat" className="block text-sm font-medium text-black mb-1">Zakat Paid</label>
              <input value={formData.zakat} id="zakat" name="zakat" placeholder="Zakat Paid" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="donations" className="block text-sm font-medium text-black mb-1">Charitable Donations</label>
              <input value={formData.donations} id="donations" name="donations" placeholder="Charitable Donations" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="medicalExpenses" className="block text-sm font-medium text-black mb-1">Medical Expenses</label>
              <input value={formData.medicalExpenses} id="medicalExpenses" name="medicalExpenses" placeholder="Medical Expenses" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="educationExpenses" className="block text-sm font-medium text-black mb-1">Education Expenses</label>
              <input value={formData.educationExpenses} id="educationExpenses" name="educationExpenses" placeholder="Education Expenses" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
          </div>
        </div>

        {/* Assets */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold text-black mb-4">Assets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bankAccounts" className="block text-sm font-medium text-black mb-1">Bank Balances</label>
              <input value={formData.bankAccounts} id="bankAccounts" name="bankAccounts" placeholder="Bank Balances" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="propertyDetails" className="block text-sm font-medium text-black mb-1">Properties</label>
              <input value={formData.propertyDetails} id="propertyDetails" name="propertyDetails" placeholder="Properties" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
            <div>
              <label htmlFor="vehicleDetails" className="block text-sm font-medium text-black mb-1">Vehicles</label>
              <input value={formData.vehicleDetails} id="vehicleDetails" name="vehicleDetails" placeholder="Vehicles" onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-[14px]" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          {/* <button type="submit" className="bg-[#f18021] hover:bg-black text-white px-8 py-3 rounded-xl shadow-lg font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-400">
            Submit Information
          </button> */}

          <button
          type='submit'
          className="group w-full mt-6 bg-[#f18021] text-white px-6 py-2 rounded-3xl hover:bg-[#d96c14] font-semibold flex items-center justify-center gap-2 transition-all duration-200"
        >
            <>
              Submit Filing
              <HiArrowRight
                size={18}
                className="transform transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
        </button>
        </div>
      </form>
    </div>
  );
}
export default FamilyTaxFiling;
