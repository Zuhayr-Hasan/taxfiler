"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// Import required modules
import { EffectCards, Autoplay } from "swiper/modules";

const reviewsData = [
    {
        dp: "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
        review: "It's a great service to deal with the FBR issues. Staff is very cooperative, helpful, and responds quickly.",
        name: "@qasarabbas",
        color: "crimson"
    },
    {
        dp: "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
        review: "It's a great service to deal with the FBR issues. Staff is very cooperative, helpful, and responds quickly.",
        name: "@qasarabbas",
        color: "#004040"
    },
    {
        dp: "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
        review: "I've been using their taxation services for years, and their professionalism is unmatched. They handle everything seamlessly, saving me time and money. Truly the best in Pakistan!",
        name: "@qasarabbas",
        color: "orange"
    },
    {
        dp: "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
        review: "It's a great service to deal with the FBR issues. Staff is very cooperative, helpful, and responds quickly.",
        name: "@qasarabbas",
        color: "#002147"
    },
    {
        dp: "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
        review: "I was dreading tax season, but their team made it effortless. They explained everything clearly and ensured compliance without any hassle.",
        name: "@qasarabbas",
        color: "#004040"
    },
    {
        dp: "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
        review: "It's a great service to deal with the FBR issues. Staff is very cooperative, helpful, and responds quickly.",
        name: "@qasarabbas",
        color: "#002147"
    },
    {
        dp: "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
        review: "They respond quickly and are incredibly efficient. Whether it’s tax filing or resolving queries, they’ve always been a step ahead.",
        name: "@qasarabbas",
        color: "purple"
    }
]

export default function Reviews() {
  return (
    <Swiper
      effect="cards"
      grabCursor={true}
      modules={[EffectCards, Autoplay]}
      autoplay={{
        delay: 3000, // Delay between slides in milliseconds (3 seconds)
        disableOnInteraction: false, // Continue autoplay even after user interaction
      }}
      className="mySwiper"
      style={{ height: "430px" }}
      speed={800}
    >
      { reviewsData.map((item, index) => (
        <SwiperSlide key={index} className={`rounded-xl h-full`} style={{ backgroundColor: item.color }}>
         <div className="flex flex-col justify-center items-center w-full h-full">
           <div className="flex justify-center mb-[45px] rounded-[50vh]">
             <Image
               src={item.dp}
               alt="dp"
               width={90}
               height={90}
               className="rounded-[50vh]"
             />
           </div>
           <div className="px-4">
             <p className="font-lato font-bold text-[16px] text-[#f0f0f0]">
               {item.review}
             </p>
             <p className="text-[#f0f0f0] font-lato text-right mt-5 text-[14px]">{item.name}</p>
           </div>
         </div>
       </SwiperSlide>
      ))}
    </Swiper>
  );
}
