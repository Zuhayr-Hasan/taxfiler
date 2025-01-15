import Image from "next/image";
import Header from '@/components/Header';
import Carousel from "@/components/Elements/Carousel";
import Footer from "@/components/Footer";
import Slider from "@/components/Elements/Slider"
import Reviews from "@/components/Elements/Reviews";
import Logo from "../public/logo.png";

export default function Home() {
  return (
    <div>
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
      <Header />
      <div className="bg-[#fff3e9] lg:pt-[60px] xs:pt-[50px] lg:pb-[60px] xs:pb-[50px]">
        <h1 className="font-lato lg:text-[40px] xs:text-[22px] font-bold lg:ml-[90px] bg-gradient-to-b from-orange-400 to-orange-600 bg-clip-text text-transparent lg:leading-[55px] xs:text-center lg:text-left">File Your Taxes In Just 6 Minutes <br /> With Our Qualified Consultants!</h1>
        <h3 className="font-lato lg:text-left lg:ml-[90px] font-bold lg:text-[30px] xs:text-[20px] xs:text-center xs:mt-1">Now available in just Rs. 3000/-</h3>
        <p className="font-lato lg:ml-[90px] text-[16px] lg:w-[600px] mt-4 xs:text-center xs:px-3">Befiler goes beyond tax filing! We also help with all your business registration, sales tax filing, trademark registration, and LLC registration in the USA — all in one place.</p>
        <button className="font-lato font-bold bg-[#f18021] px-[50px] py-2 mt-5 rounded-lg text-[#fff] lg:ml-[90px] xs:mx-auto xs:block transform transition-transform duration-500 hover:scale-105">
          File now
        </button>
      </div>
      <div className="lg:mt-[60px] xs:mt-[40px]">
        <h2 className="text-center mt-5 lg:text-[32px] xs:text-[24px] font-bold">Our Partners & Collaborators</h2>
        <div className="lg:mt-[60px] xs:mt-[40px] flex justify-center bg-white rounded-lg">
          <Carousel />
        </div>

        {/* <div></div> */}
      </div>
      <div className="lg:mt-[60px] xs:mt-[40px]">
        <h2 className="text-center lg:text-[32px] xs:text-[24px] font-bold mt-[20px]">
          Popular Products
        </h2>
        <div className="lg:mt-[0px] xs:mt-[40px] px-4">
          <Slider />
        </div>
      </div>

      <div className="bg-[#fff3e9] lg:mt-[120px] xs:mt-[60px] flex lg:flex-row xs:flex-col lg:justify-between xs:justify-center xs:items-center lg:items-start lg:mx-10 xs:mx-5 py-10 rounded-xl">
        <div className="">
          <h2 className="lg:text-[32px] xs:text-[28px] font-lato font-bold lg:mt-[80px] xs:mt-[30px] lg:ml-10 xs:ml-0 lg:text-left xs:text-center">Trusted by <span className="text-[#f18021]">hundreds of clients</span></h2>
          <p className="lg:text-left font-lato lg:mt-10 xs:mt-5 lg:pl-10 lg:pr-[250px] text-[18px] xs:text-center xs:px-5 lg:px-0">With over <span className="font-bold font-lato">30 years of expertise</span>, we provide unparalleled taxation services in Pakistan, ensuring compliance and maximizing savings for businesses and individuals. Our seasoned professionals specialize in tax planning, filing, and resolving complex tax matters efficiently. Trust us to simplify your financial journey with personalized solutions and unmatched dedication.</p>
        </div>
      
        <div className="border lg:w-[300px] xs:w-[255px] h-auto lg:mr-[100px] xs:mr-0 xs:mt-10 lg:mt-0">
         <Reviews />
        </div>
      </div>
      <div className="lg:mt-[120px] xs:mt-[60px]">
        <Footer />
      </div>
    </div>
  );
}
