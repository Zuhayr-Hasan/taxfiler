"use client"

import React, { useRef, useState, useEffect } from 'react';
import { IoCloudUpload, IoCloseCircle } from "react-icons/io5";
import Header from '../Header/index';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import Image from 'next/image';

function Index() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<{ front: File | null; back: File | null }>({
    front: null,
    back: null
  });
  const [cnicUploaded, setCnicUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const fetchData = async () => {
      const user = getAuth().currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, "credentials", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCnicUploaded(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [hasMounted]);

  const handleIconClick = () => {
    if (images.front && images.back) {
      alert("You can only upload front and back of CNIC.");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert("Only JPG, JPEG, or PNG files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be under 2MB.");
      return;
    }

    if (!images.front) {
      setImages((prev) => ({ ...prev, front: file }));
    } else if (!images.back) {
      setImages((prev) => ({ ...prev, back: file }));
    }

    event.target.value = '';
  };

  const handleRemove = (side: 'front' | 'back') => {
    setImages((prev) => ({ ...prev, [side]: null }));
  };

  const isReadyToSubmit = images.front && images.back;

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
    try {
      if (!images.front || !images.back) return;

      const frontUrl = await uploadToCloudinary(images.front);
      const backUrl = await uploadToCloudinary(images.back);

      const user = getAuth().currentUser;
      if (!user) {
        alert("User not authenticated");
        return;
      }

      await setDoc(doc(db, "credentials", user.uid), {
        cnicFront: frontUrl,
        cnicBack: backUrl,
        // uploadedAt: new Date(),
      }, { merge: true });

      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  if (!hasMounted) return null;

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-[80px]">
        <h2 className="font-bold text-[34px]">NTN Registration</h2>
        <p className="mt-5">We have made the simplest process for NTN registration</p>
        <p className="mt-2 font-bold text-[16px] flex justify-center text-center px-4">
          Please upload your CNIC front & back. Only JPG, JPEG, PNG formats under 2MB are allowed.
        </p>

        {!loading && !cnicUploaded && (
          <div
            className={`mt-8 cursor-pointer ${images.front && images.back ? 'opacity-40 pointer-events-none' : ''}`}
            onClick={handleIconClick}
          >
            <IoCloudUpload size={150} color="#ffcca2" />
          </div>
        )}

        {!loading && cnicUploaded && (
          <p className="mt-6 text-green-700 font-semibold text-lg">✅ You have already uploaded your CNIC.</p>
        )}

        <input
          type="file"
          accept="image/jpeg, image/png"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <div className="flex gap-5 mt-6">
          {images.front && (
            <div className="relative">
              <p className="text-center font-semibold text-sm bg-[#eee] mb-1 rounded-lg text-[#444]">CNIC Front</p>
              <Image src={URL.createObjectURL(images.front)} alt="Front CNIC" width={200} height={120} />
              <button
                type="button"
                onClick={() => handleRemove('front')}
                className="absolute top-0 right-0 bg-white rounded-full"
              >
                <IoCloseCircle size={22} color="gray" />
              </button>
            </div>
          )}
          {images.back && (
            <div className="relative">
              <p className="text-center font-semibold text-sm bg-[#eee] mb-1 rounded-lg text-[#444]">CNIC Back</p>
              <Image src={URL.createObjectURL(images.back)} alt="Back CNIC" width={200} height={120} />
              <button
                type="button"
                onClick={() => handleRemove('back')}
                className="absolute top-0 right-0 bg-white rounded-full"
              >
                <IoCloseCircle size={22} color="gray" />
              </button>
            </div>
          )}
        </div>

        {isReadyToSubmit && (
          <button
            type="button"
            className="mt-[60px] text-md py-3 px-[100px] rounded-3xl bg-[#f18021] hover:bg-orange-600 text-white transition-all"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Index;
