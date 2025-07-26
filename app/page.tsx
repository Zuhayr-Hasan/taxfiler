// // import Image from "next/image";
// import Header from '@/components/Header';
// import Carousel from "@/components/Elements/Carousel";
// import Footer from "@/components/Footer";
// import Slider from "@/components/Elements/Slider"
// import Reviews from "@/components/Elements/Reviews";
// // import Logo from "../public/logo.png";

// export default function Home() {
//   return (
//     <div>
//       <Header />
//       <div className="bg-[#fff3e9] lg:pt-[60px] xs:pt-[50px] lg:pb-[60px] xs:pb-[50px]">
//         <h1 className="font-lato lg:text-[40px] xs:text-[22px] font-bold lg:ml-[90px] bg-gradient-to-b from-orange-400 to-orange-600 bg-clip-text text-transparent lg:leading-[55px] xs:text-center lg:text-left">File Your Taxes In Just 6 Minutes <br /> With Our Qualified Consultants!</h1>
//         <h3 className="font-lato lg:text-left lg:ml-[90px] font-bold lg:text-[30px] xs:text-[20px] xs:text-center xs:mt-1">Now available in just Rs. 3000/-</h3>
//         <p className="font-lato lg:ml-[90px] text-[16px] lg:w-[600px] mt-4 xs:text-center xs:px-3">Zubair Talib and Company goes beyond tax filing! We also help with all your business registration, sales tax filing, trademark registration, and LLC registration in the USA — all in one place.</p>
//         <button className="font-lato font-bold bg-[#f18021] px-[50px] py-2 mt-5 rounded-lg text-[#fff] lg:ml-[90px] xs:mx-auto xs:block transform transition-transform duration-500 hover:scale-105">
//           File now
//         </button>
//       </div>
//       <div className="lg:mt-[60px] xs:mt-[40px]">
//         <h2 className="text-center mt-5 lg:text-[32px] xs:text-[24px] font-bold">Our Partners & Collaborators</h2>
//         <div className="lg:mt-[60px] xs:mt-[40px] flex justify-center bg-white rounded-lg">
//           <Carousel />
//         </div>

//         {/* <div></div> */}
//       </div>
//       <div className="lg:mt-[60px] xs:mt-[40px]">
//         <h2 className="text-center lg:text-[32px] xs:text-[24px] font-bold mt-[20px]">
//           Popular Products
//         </h2>
//         <div className="lg:mt-[0px] xs:mt-[40px] px-4">
//           <Slider />
//         </div>
//       </div>

//       <div className="bg-[#fff3e9] lg:mt-[120px] xs:mt-[60px] flex lg:flex-row xs:flex-col lg:justify-between xs:justify-center xs:items-center lg:items-start lg:mx-10 xs:mx-5 py-10 rounded-xl">
//         <div className="">
//           <h2 className="lg:text-[32px] xs:text-[28px] font-lato font-bold lg:mt-[80px] xs:mt-[30px] lg:ml-10 xs:ml-0 lg:text-left xs:text-center">Trusted by <span className="text-[#f18021]">hundreds of clients</span></h2>
//           <p className="lg:text-left font-lato lg:mt-10 xs:mt-5 lg:pl-10 lg:pr-[250px] text-[18px] xs:text-center xs:px-5 lg:px-0">With over <span className="font-bold font-lato">30 years of expertise</span>, we provide unparalleled taxation services in Pakistan, ensuring compliance and maximizing savings for businesses and individuals. Our seasoned professionals specialize in tax planning, filing, and resolving complex tax matters efficiently. Trust us to simplify your financial journey with personalized solutions and unmatched dedication.</p>
//         </div>
      
//         <div className="border lg:w-[300px] xs:w-[255px] h-auto lg:mr-[100px] xs:mr-0 xs:mt-10 lg:mt-0">
//          <Reviews />
//         </div>
//       </div>
//       <div className="lg:mt-[120px] xs:mt-[60px]">
//         <Footer />
//       </div>
//     </div>
//   );
// }

"use client"
// import Image from "next/image";
import Header from '@/components/Header';
import Carousel from "@/components/Elements/Carousel";
import Footer from "@/components/Footer";
import Slider from "@/components/Elements/Slider"
import Reviews from "@/components/Elements/Reviews";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleFiling = () => {
    router.push("/login")
  }

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#fff3e9] lg:pt-[60px] xs:pt-[50px] lg:pb-[60px] xs:pb-[50px]">
        <h1 className="font-lato lg:text-[40px] xs:text-[22px] font-bold lg:ml-[90px] bg-gradient-to-b from-orange-400 to-orange-600 bg-clip-text text-transparent lg:leading-[55px] xs:text-center lg:text-left">
          File Your Taxes in Just 6 Minutes <br /> with Professional Support
        </h1>
        <h3 className="font-lato lg:text-left lg:ml-[90px] font-bold lg:text-[30px] xs:text-[20px] xs:text-center xs:mt-1">
          Starting at only Rs. 3000/-
        </h3>
        <p className="font-lato lg:ml-[90px] text-[16px] lg:w-[600px] mt-4 xs:px-3">
          Zubair Talib & Co. provides end-to-end solutions beyond tax filing — including business setup, sales tax compliance, trademark registration. Everything you need, all in one place.
        </p>
        <button 
          className="font-lato font-bold bg-[#f18021] px-[50px] py-2 mt-5 rounded-lg text-[#fff] lg:ml-[90px] xs:mx-auto xs:block transform transition-transform duration-500 hover:scale-105" 
          onClick={handleFiling}
          // target="blank"
        >
          Start Filing
        </button>
      </div>


      {/* Partners */}
      <div className="lg:mt-[60px] xs:mt-[40px]">
        <h2 className="text-center mt-5 lg:text-[32px] xs:text-[24px] font-bold">Our Valued Partners</h2>
        <div className="lg:mt-[60px] xs:mt-[40px] flex justify-center bg-white rounded-lg">
          <Carousel />
        </div>
      </div>

      {/* Services */}
      <div className="lg:mt-[60px] xs:mt-[40px]">
        <h2 className="text-center lg:text-[32px] xs:text-[24px] font-bold mt-[20px]">
          Featured Services
        </h2>
        <div className="lg:mt-[0px] xs:mt-[40px] px-4">
          <Slider />
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#fff3e9] lg:mt-[120px] xs:mt-[60px] flex lg:flex-row xs:flex-col lg:justify-between xs:justify-center xs:items-center lg:items-start lg:mx-10 xs:mx-5 py-10 rounded-xl">
        <div>
          <h2 className="lg:text-[32px] xs:text-[28px] font-lato font-bold lg:mt-[80px] xs:mt-[30px] lg:ml-10 xs:ml-0 lg:text-left xs:text-center">
            Trusted by <span className="text-[#f18021]">Thousands of Clients</span>
          </h2>
          <p className="lg:text-left font-lato lg:mt-10 xs:mt-5 lg:pl-10 lg:pr-[250px] text-[18px] xs:text-center xs:px-5 lg:px-0">
            With a legacy of <span className="font-bold font-lato">over 30+ years</span> in the tax advisory field, our team provides dependable solutions tailored to individuals and businesses across Pakistan. From filing to legal compliance, we make taxation seamless and worry-free.
          </p>
        </div>
        <div className="border lg:w-[300px] xs:w-[255px] h-auto lg:mr-[100px] xs:mr-0 xs:mt-10 lg:mt-0">
          <Reviews />
        </div>
      </div>

      {/* Footer */}
      <div className="lg:mt-[120px] xs:mt-[60px]">
        <Footer />
      </div>
    </div>
  );
}
