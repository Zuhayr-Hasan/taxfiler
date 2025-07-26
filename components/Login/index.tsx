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

  const handleHomePage = () => {
    router.push('/')
  }

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
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="bg-white rounded-2xl px-8 py-10 w-full max-w-md">
          <form onSubmit={handleLogin} className="">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Login to continue</h2>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mt-[30px] block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <MdEmail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  required
                  placeholder="someone@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-[10px]">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <MdLock size={18} />
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  required
                  placeholder="•••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-300"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link href="/forgetpassword" className="text-sm text-orange-500 hover:underline transition">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-[20px] w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-sm text-[16px]"
            >
              {loading ? <BeatLoader size={10} color="#ffffff" /> : "Go to dashboard"}
            </button>

            {/* Signup */}
            <p className="mt-[10px] text-center text-sm text-gray-600">
              Don’t have an account? <Link href="/signup" className="text-orange-500 hover:underline">Sign up for free</Link>
            </p>
          </form>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              onClick={handleHomePage}
              className="text-sm bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Index;
