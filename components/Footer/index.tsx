import React from "react";
import Image from "next/image";
import Logo from "../../public/logo.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-orange-400 to-orange-600 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-between items-start">
          {/* Logo and About */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <Image
              src={Logo} // Replace with your logo path
              alt="Logo"
              width={170}
              height={50}
              className="mb-4 rounded-lg"
            />
            <p className="text-sm text-gray-200 lg:pr-[140px] pt-3 font-bold">
              Helping you file taxes, register businesses, and stay ahead in the corporate world. Reliable, fast, and affordable solutions at your fingertips.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="font-bold hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="font-bold hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="font-bold hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="font-bold hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-200 font-bold">Kareem Centre, Nishtar Road Multan</p>
            <p className="text-sm text-gray-200 font-bold">Multan, Pakistan</p>
            <p className="font-bold text-sm text-gray-200 mt-2">
              Email:{" "}
              <a href="mailto:info@befiler.com" className="hover:text-white">
                zubairtalib@yahoo.com
              </a>
            </p>
            <p className="font-bold text-sm text-gray-200">
              Phone:{" "}
              <a href="tel:+923001234567" className="hover:text-white">
                +92 300 6300806
              </a>
            </p>
          </div>
        </div>

        {/* Social Media */}
        {/* <div className="mt-10 flex justify-center space-x-4">
          <a href="#" className="text-gray-200 hover:text-white">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-gray-200 hover:text-white">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-gray-200 hover:text-white">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-200 hover:text-white">
            <FaLinkedin size={24} />
          </a>
        </div> */}

        {/* Footer Bottom */}
        <div className="font-bold mt-10 border-t border-[#eee] pt-6 text-center text-sm text-gray-200">
          &copy; 1995 - {new Date().getFullYear()} Zubair Talib and Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
