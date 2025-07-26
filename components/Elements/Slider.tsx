"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../styles/slider.css'

const sliderData = [
    {
        business: "Individual NTN Registration",
        description: "Register your personal NTN in just 3 easy steps – Sign Up, Upload, and Pay.",
    },
    {
        business: "Tax Filing",
        description: "Skip the hassle of appointments. File your taxes online in minutes.",
    },
    {
        business: "Business NTN Registration",
        description: "Launch your business swiftly with our streamlined NTN registration process.",
    },
    {
        business: "Sales Tax Registration",
        description: "Get your GST registered quickly and effortlessly through our platform.",
    },
    {
        business: "Business Tax Filing",
        description: "Leave your tax concerns to our professionals — accurate and stress-free filing.",
    }
];


function Slider() {
    const router = useRouter();
    const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png";
    const imageUrlTwo = "https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png";

    const handleRoute = () => {
        router.push("/login");
    }

    return (
        <div className="lg:mt-[60px] xs:mt-[40px] flex justify-center">
            <Swiper
                className="flex justify-center"
                // style={{ maxWidth: "" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                navigation={true}
                pagination={true}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 5 },
                    640: { slidesPerView: 2, spaceBetween: 15 },
                    768: { slidesPerView: 1, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 15 },
                    1440: { slidesPerView: 5, spaceBetween: 30 },
                }}
            >
                {sliderData.map((item, index) => (
                    <SwiperSlide className="flex justify-center items-center" key={index}>
                        <div className="w-full max-w-[320px] flex flex-col justify-between items-center rounded-2xl bg-[#fff7f0] py-8 px-6 shadow-sm h-[340px] hover:shadow-md transition-shadow duration-300">

                            {/* Title */}
                            <h3 className="text-[22px] font-semibold text-center text-[#1e1e1e] leading-snug tracking-tight">
                                {item.business}
                            </h3>

                            {/* Description */}
                            <p className="text-center text-[#3d3d3d] font-medium mt-5 text-[15px] leading-relaxed tracking-normal lg:px-0 sm:px-4">
                                {item.description}
                            </p>

                            {/* CTA Button */}
                            <button 
                                className="px-5 py-2.5 mt-6 bg-[#f18021] text-white rounded-xl text-[15px] font-semibold shadow hover:bg-[#dd7015] transition-colors duration-300"
                                onClick={handleRoute}
                            >
                                Click here to start now!
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slider;
