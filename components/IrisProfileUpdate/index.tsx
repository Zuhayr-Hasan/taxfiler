'use client';

import React, { useState, useEffect } from 'react';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { FaCreditCard } from 'react-icons/fa';
import Header from '../Header';
import { pakistanBanks } from '../../utils/constant';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function FormPage() {
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    address: '',
    employerName: '',
    pinCode: '',
    password: '',
    bankAccounts: [{ bank: '', iban: '' }],
  });
  
  useEffect(() => {
    const auth = getAuth();

    // if (!user) {
    //   console.error("User not authenticated!");
    //   return;
    // }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.getIdToken(true);
        const userRef = doc(db, 'credentials', user.uid);
        const snapshot = await getDoc(userRef);
  
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUserData({
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            employerName: data.employerName || '',
            pinCode: data.pinCode || '',
            password: data.password || '',
            bankAccounts: data.bankAccounts?.length ? data.bankAccounts : [{ bank: '', iban: '' }],
          });
        }
      }
    });
  
    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);
  

  const handleFieldChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  console.log("user-data: ", userData);

  const handleAddAccount = () => {
    setUserData((prev) => ({
      ...prev,
      bankAccounts: [...prev.bankAccounts, { bank: '', iban: '' }],
    }));
  };

  const handleRemoveAccount = (index: number) => {
    setUserData((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((_, i) => i !== index),
    }));
  };

  const handleChangeBank = (
    index: number,
    field: 'bank' | 'iban',
    value: string
  ) => {
    const updated = [...userData.bankAccounts];
    updated[index][field] = value;
    setUserData((prev) => ({ ...prev, bankAccounts: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      alert('User not authenticated.');
      return;
    }

    console.log("currentUser",  currentUser);
    await currentUser.getIdToken(true);
    try {
      const res = await fetch('/api/irisProfileUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: currentUser.uid, ...userData }),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert('Information saved successfully!');
      } else {
        alert(result.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      <section className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-900">
          Personal & Banking Details
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto text-lg">
          Please fill in your contact and banking information accurately to proceed with your application.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="email"
              placeholder="Email Address"
              value={userData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className="border p-3 rounded-lg w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Phone"
              value={userData.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className="border p-3 rounded-lg w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Present Address"
              value={userData.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              className="border p-3 rounded-lg w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 col-span-2"
            />
            <input
              type="text"
              placeholder="Employer Name"
              value={userData.employerName}
              onChange={(e) => handleFieldChange('employerName', e.target.value)}
              className="border p-3 rounded-lg w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 col-span-2"
            />
            <input
              type="text"
              placeholder="PIN Code"
              value={userData.pinCode}
              onChange={(e) => handleFieldChange('pinCode', e.target.value)}
              className="border p-3 rounded-lg w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              className="border p-3 rounded-lg w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Banking Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCreditCard className="text-orange-500" />
              Bank Accounts
            </h2>

            {userData.bankAccounts.map((account, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 bg-white shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={account.bank}
                    onChange={(e) => handleChangeBank(index, 'bank', e.target.value)}
                    className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Bank</option>
                    {pakistanBanks.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Enter your IBAN"
                    value={account.iban}
                    onChange={(e) => handleChangeBank(index, 'iban', e.target.value)}
                    className="border p-3 rounded w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {userData.bankAccounts.length > 1 && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveAccount(index)}
                      className="text-sm text-red-600 flex items-center gap-1 hover:underline"
                    >
                      <BiTrash className="text-lg" /> Remove Account
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="text-left">
              <button
                type="button"
                onClick={handleAddAccount}
                className="mt-2 inline-flex items-center gap-2 text-orange-600 font-medium hover:underline"
              >
                <BiPlus className="text-xl" /> Add another account
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 transition text-white font-medium px-6 py-3 rounded-lg text-lg shadow"
            >
              Submit Information
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default FormPage;
