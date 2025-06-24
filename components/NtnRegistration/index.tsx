"use client"

import React, { useRef, useState } from 'react';
import { IoCloudUpload, IoCloseCircle } from "react-icons/io5";
import Header from '../Header/index';

function Index() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<{ front: string | null; back: string | null }>({
    front: null,
    back: null
  });

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
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      alert("Only JPG, JPEG, or PNG files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (!images.front) {
        setImages((prev) => ({ ...prev, front: reader.result as string }));
      } else if (!images.back) {
        setImages((prev) => ({ ...prev, back: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleRemove = (side: 'front' | 'back') => {
    setImages((prev) => ({ ...prev, [side]: null }));
  };

  const isReadyToSubmit = images.front && images.back;

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-[80px]">
        <h2 className="font-bold text-[34px]">NTN Registration</h2>
        <p className="mt-5">We have made the simplest process for NTN registration</p>
        <p className="mt-2 font-bold text-[16px] flex justify-center text-center px-4">
          Please upload your CNIC front & back. Only JPG, JPEG, PNG formats under 2MB are allowed.
        </p>

        {/* Upload icon */}
        <div
          className={`mt-8 cursor-pointer ${images.front && images.back ? 'opacity-40 pointer-events-none' : ''}`}
          onClick={handleIconClick}
        >
          <IoCloudUpload size={150} color="#ffcca2" />
        </div>

        {/* Hidden input */}
        <input
          type="file"
          accept="image/jpeg, image/png"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Preview section */}
        <div className="flex gap-5 mt-6">
          {images.front && (
            <div className="relative">
              <p className="text-center font-semibold">Front</p>
              <img
                src={images.front}
                alt="CNIC Front"
                className="w-[150px] h-[100px] object-cover rounded-md"
              />
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
              <p className="text-center font-semibold">Back</p>
              <img
                src={images.back}
                alt="CNIC Back"
                className="w-[150px] h-[100px] object-cover rounded-md"
              />
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

        {/* Submit Button: Only show if both images uploaded */}
        {isReadyToSubmit && (
          <button
            type="button"
            className="mt-[60px] text-md py-3 px-[100px] rounded-3xl bg-[#f18021] hover:bg-orange-600 text-white transition-all"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Index;
