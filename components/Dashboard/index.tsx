"use client"
import React from 'react';
import Header from '../Header/index';
import { useRouter } from "next/navigation";
import { FaUserTie } from "react-icons/fa"; // Personal Tax Filing
import { FaUsers } from "react-icons/fa"; // Family Tax Filing
import { PiIdentificationCardFill } from "react-icons/pi"; // NTN Registration
import { MdManageAccounts } from "react-icons/md"; // IRIS Profile Update

const data = [
  {
    img: FaUserTie,
    heading: "Personal Tax Filing",
  },
  {
    img: FaUsers,
    heading: "Family Tax Filing",
  },
  {
    img: PiIdentificationCardFill,
    heading: "NTN Registration",
  },
  {
    img: MdManageAccounts,
    heading: "IRIS Profile Update",
  },
];

function Index() {
  const router = useRouter();

  const handleClick = (item: string) => {
    if (item === "NTN Registration") {
      router.push("/ntnregistration");
    }
    if (item === "IRIS Profile Update") {
      router.push("/irisprofileupdate");
    }
    if (item === "Personal Tax Filing") {
      router.push("/personalTaxFiling");
    }
    if (item === "Family Tax Filing") {
      router.push("/familyTaxFiling");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center border">
        <div className="grid grid-cols-1 gap-6 w-full max-w-md px-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-start bg-[#FFF5EB] py-4 rounded-xl px-6 hover:shadow-lg duration-300 ease-in cursor-pointer"
              onClick={() => handleClick(item.heading)}
            >
              <item.img size={38} color="#f18021" />
              <h2 className="pl-4 font-bold text-[16px]">{item.heading}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
