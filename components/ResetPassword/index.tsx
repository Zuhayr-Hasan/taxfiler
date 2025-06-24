"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";
import Header from "../Header/index";
import { BeatLoader } from "react-spinners";
import { MdEmail } from "react-icons/md";

function Index() {
  const [form, setForm] = useState({
    email: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleForgetPassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, form.email);
      console.log("Verification email has been sent. Please check your mailbox.");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center bg-[white] mt-[160px]">
        <div className="min-w-[400px]">
          {/* <h3 className="text-[30px] text-[#f18021] font-bold text-center">
            Reset Password
          </h3> */}
          <form onSubmit={handleForgetPassword} className="px-3 flex flex-col items-center">
            {/* Email Field */}
            <div className="mt-[80px] flex flex-col w-full relative">
              <label className="text-[14px] text-[#191919]" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <MdEmail size={20} />
                </span>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => handleOnChange(e)}
                  className="bg-[#eee] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 hover:border-[#f18021] duration-500"
                  placeholder="someone@example.com"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-3 w-full">
              <button
                type="submit"
                className="w-full text-[#f0f0f0] font-bold rounded-lg py-2 bg-[#f18021] transform transition-transform duration-500 hover:scale-105"
              >
                {loading ? <BeatLoader size={10} color="#f0f0f0" /> : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index;
