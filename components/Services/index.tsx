import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { FaCheck } from "react-icons/fa";
import { services } from '../../utils/constant';

function Index() {
  return (
    <div>
      <Header />
      <div className="px-4 md:px-10 lg:px-[90px] pt-6 md:pt-11 bg-[#fff]">
        {/* Title and Description */}
        <h1 className="font-bold text-[24px] md:text-[28px] lg:text-[32px]">
          Our business services
        </h1>
        <p className="text-[16px] md:text-[18px] mt-4 lg:w-[700px]">
          Registering a business can be a quite stressful. Worry not! Get expert assistance on how and which business structure to select and start your entrepreneurial journey with a bang!
        </p>

        {/* Service Cards */}
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-[#fafafa] mt-6 md:mt-8 px-6 md:px-8 lg:px-10 py-6 md:py-7 rounded-xl shadow-md"
          >
            {/* Title and Price */}
            <div className="flex flex-col md:flex-row justify-between">
              <h3 className="font-bold text-[18px] md:text-[20px]">{item.title}</h3>
              <p className="font-bold text-[16px] md:text-[18px] mt-2 md:mt-0">
                Rs. {item.price}
              </p>
            </div>

            {/* Completion Time */}
            <div className="flex flex-col md:flex-row justify-between mt-4">
              <p className="text-[14px] md:text-[16px]">Completion Time:</p>
              <p className="text-[14px] md:text-[16px]">{item.completion}</p>
            </div>

            {/* Requirements */}
            <div className="flex flex-col mt-4">
              <p className="text-[14px] md:text-[16px]">Requirements:</p>
              {item.requirments.map((requirement: string, reqIndex: number) => (
                <ul key={reqIndex} className="mt-2">
                  <li className="flex items-center text-[14px] md:text-[16px]">
                    <span className="mr-3">
                      <FaCheck color="green" />
                    </span>
                    {requirement}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-[60px] md:mt-[80px] lg:mt-[100px]">
        <Footer />
      </div>
    </div>
  );
}

export default Index;
