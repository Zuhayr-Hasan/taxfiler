"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../styles/slider.css'

const sliderData = [
    {
        business: "Individual NTN Registration",
        description: "Just register your Individual NTN in 3 simple steps. Register, Upload, Pay.",
    },
    {
        business: "Tax Filing",
        description: "No appointments, no documents, File your taxes within minutes.",
    },
    {
        business: "Business NTN Registration",
        description: "The simplest and quickest way to start your business in pakistan.",
    },
    {
        business: "Sales Tax Registration",
        description: "GST Registration was never this easy, Register your sales tax with Befiler Now.",
    },
    {
        business: "Business Tax Filing",
        description: "Stop worrying about your taxes, Befiler team of experts got you covered.",
    }
]

function Slider() {
    const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png";
    const imageUrlTwo = "https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png";

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
                    <div className="w-full flex flex-col justify-between items-center rounded-lg bg-[#fff3e9] py-6 px-4 h-[320px]">
                        <h3 className="text-[20px] text-center font-bold">{item.business}</h3>
                        <p className="text-center mt-4 text-[14px] leading-relaxed lg:px-0 xs:px-8">{item.description}</p>
                        <button className="px-4 py-2 mt-4 bg-[#f18021] text-white rounded-lg text-[15px] font-lato">
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
