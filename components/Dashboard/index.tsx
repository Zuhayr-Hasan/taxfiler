"use client"
import React from 'react';
import Header from '../Header/index';
import { FaFileArchive } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { AiFillCalculator } from "react-icons/ai";
import { useRouter } from "next/navigation";

const data = [
  {
    img: FaFileArchive,
    heading: "Personal Tax Filing",
  },
  {
    img: FaPeopleRoof,
    heading: "Family Tax Filing",
  },
  {
    img: FaBookOpen,
    heading: "NTN Registration",
  },
  {
    img: MdFindInPage,
    heading: "NTN Finder",
  },
  {
    img: FaPeopleGroup,
    heading: "Personal Tax Filing",
  },
  {
    img: FaPerson,
    heading: "ATL Status Finder",
  },
  {
    img: FaBuilding,
    heading: "Personal Tax Filing",
  },
  {
    img: FaCartArrowDown,
    heading: "IRIS Profile Update",
  },
  {
    img: GrServices,
    heading: "Businesses Incorporation",
  },
  {
    img: AiFillCalculator,
    heading: "GST Registration",
  },
  {
    img: GrServices,
    heading: "Service Charges",
  },
  {
    img: AiFillCalculator,
    heading: "Salary Tax Calculator",
  },
];

function Index() {
  const router = useRouter();

  const handleClick = (item: string) => {
    if(item === "NTN Registration") {
      router.push("/ntnregistration");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
    <Header />
    <div className="flex-grow flex justify-center items-center border">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-4">
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
