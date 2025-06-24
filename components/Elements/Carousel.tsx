"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import '../../styles/slider.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const cleintsData = ["Nestle", "UBL", "Imtiaz", "ChenOne", "ECS", "Ramada", "Google", "Melt9"];

function Carousel() {
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png";
  const imageUrlTwo =
    "https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png";

  return (
    <Swiper
      className="flex justify-center swiper-container swiper-container-free-mode"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={30}
      slidesPerView={6}
      autoplay={{
        delay: 0, // No delay between transitions
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={true} // Enable looping
      speed={3000} // Smooth transition speed
      // cssMode={true} // Enables smooth CSS transitions
      freeMode={true} // Allows continuous sliding
      // loopAdditionalSlides={2} // Adds additional slides for seamless looping
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      }}
    >
      {cleintsData.map((item, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center swiper-container-free-mode">
          <div className="w-full flex justify-center items-center swiper-wrapper">
            {/* <Image
              src={index % 2 === 0 ? imageUrl : imageUrlTwo}
              alt={`logo-${index}`}
              width={90}
              height={90}
            /> */}
            <h1 className="rounded-[50vh] font-bold text-[24px] text-[#555] bg-[#eee] py-3 px-[50px]">{item}</h1>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
