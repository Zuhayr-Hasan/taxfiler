"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";
import Header from "../Header/index";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { MdEmail, MdLock } from "react-icons/md";

function Index() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/dashboard");
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
        <div className="min-w-[380px]">
          {/* <h3 className="lato-bold text-[34px] text-[#f18021] font-bold text-center">
            Login
          </h3> */}
          <form onSubmit={handleLogin} className="px-3 flex flex-col items-center">
            {/* Email Field */}
            <div className="mt-3 flex flex-col w-full relative">
              <label className="text-[14px] text-[#555]" htmlFor="email">
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
                  className="bg-[#eee] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 hover:border-[#f18021] duration-500 "
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mt-3 flex flex-col w-full relative">
              <label className="text-[14px] text-[#555]" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <MdLock size={20} />
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => handleOnChange(e)}
                  className="bg-[#eee] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 hover:border-[#f18021] duration-500"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            {/* Forget Password Link */}
            <div className="flex justify-end w-full">
              <Link
                href="/forgetpassword"
                className="duration-500 rounded-md text-[14px] text-right hover:bg-[#fff3e9] text-[#555] px-2 mt-1"
              >
                Forgotten password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="mt-3 w-full">
              <button
                  type="submit"
                  className="w-full text-[#f0f0f0] font-bold rounded-lg py-2 bg-[#f18021] transform transition-transform duration-500 hover:scale-105"
                  >
                  {loading ? <BeatLoader size={10} color="#f0f0f0" /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index;
