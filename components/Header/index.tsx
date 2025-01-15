"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Login from "../Login/index";
import Logo from "../../public/logo.png";

function index() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <nav className="bg-white shadow-md sticky top-0 z-50 duration-500">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#f18021]">
            {/* <Link href="/">Zubair Talib Enterprise</Link> */}
            <Link href="/"><Image className="pt-2" src={Logo} alt="logo" width={180} /></Link>
          </div>
  
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-bold">
            <Link href="/tax-tools" className="text-gray-600 hover:text-[#f18021] transition duration-300">
              Tax Tools
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-[#f18021] transition duration-300">
              Resources
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-[#f18021] transition duration-300">
              Business Services
            </Link>
            <Link href="/sales-tax" className="text-gray-600 hover:text-[#f18021] transition duration-300">
              Sales Tax
            </Link>
            <Link href="/login">
              <button className="duration-500 bg-[#f18021] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="duration-500 border border-[#f18021] text-[#f18021] px-4 py-2 rounded-lg hover:bg-[#f18021] hover:text-white transition">
                Sign Up
              </button>
            </Link>
          </div>
  
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 py-2 space-y-4">
              <Link href="/tax-tools" className="block text-gray-800 hover:text-[#f18021] transition">
                Tax Tools
              </Link>
              <Link href="/resources" className="block text-gray-800 hover:text-[#f18021] transition">
                Resources
              </Link>
              <Link href="/business-services" className="block text-gray-800 hover:text-[#f18021] transition">
                Business Services
              </Link>
              <Link href="/sales-tax" className="block text-gray-800 hover:text-[#f18021] transition">
                Sales Tax
              </Link>
              <Link href="/signin">
                <button className="block w-full bg-[#f18021] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="block w-full border border-[#f18021] text-[#f18021] px-4 py-2 rounded-lg hover:bg-[#f18021] hover:text-white transition">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    )  
}

export default index
