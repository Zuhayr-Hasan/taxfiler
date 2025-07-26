'use client';

import React, { useState } from 'react';
import { faq } from '../../utils/constant';
import Header from '../Header';
import Footer from '../Footer';
import Carousel from '../Elements/Carousel';
import {
    FaWhatsapp,
    FaBuilding,
    FaHome,
    FaLaptopCode,
    FaChevronDown,
    // FaChevronUp
} from 'react-icons/fa';

function Index() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className="text-gray-800 font-sans">
            <Header />

            {/* Hero */}
            <section className="bg-orange-50 py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold leading-snug mb-6 text-[#1a1a1a]">
                PAKISTAN’S RELIABLE SALES TAX <br /> SERVICE FOR YOUR BUSINESS
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-6">
                Take the hassle out of compliance — we’ll manage your GST and PST registration, handle your monthly filings, and respond to tax notices, so you can concentrate on scaling your business.
                </p>
                <a
                href="https://wa.me/923311329191"
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#f18021] text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold text-base text-[14px]"
                >
                <FaWhatsapp className="text-xl" />
                +923006300806
                </a>
            </div>
            </section>

            {/* Icons */}
            <section className="py-16 bg-white px-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                    <div className="flex flex-col items-center">
                        <FaBuilding className="text-4xl text-orange-500 mb-3" />
                        <h3 className="text-xl font-semibold">SMEs</h3>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaHome className="text-4xl text-orange-500 mb-3" />
                        <h3 className="text-xl font-semibold">Startups</h3>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaLaptopCode className="text-4xl text-orange-500 mb-3" />
                        <h3 className="text-xl font-semibold">Freelancers</h3>
                    </div>
                </div>
                <div className="mt-10 max-w-3xl mx-auto text-center text-gray-700 space-y-2">
                    <p className="leading-relaxed">
                        We will ensure that you do not need to worry about Sales Tax matters anymore.
                    </p>
                    <p className="leading-relaxed">
                        Our qualified Chartered Accountants, Tax Consultants, and Legal Experts will take care of everything.
                    </p>
                </div>
            </section>

            {/* Popular Products */}
            <section className="py-16 bg-orange-50 px-6">
                <h2 className="text-center text-3xl font-bold mb-10 text-[#1a1a1a]">Popular Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: 'PST Registration',
                            desc: 'Registering your services has never been easier',
                        },
                        {
                            title: 'GST Registration',
                            desc: 'Register your business and easily get your STRN from FBR',
                        },
                        {
                            title: 'Sales Tax Filing',
                            desc: 'Whether your case is simple or complex — we’ve got you covered',
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                        >
                            <h3 className="text-xl font-semibold mb-2 leading-snug text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition">
                                Click here to start now
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white px-6 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-[#1a1a1a]">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faq.map((item, index) => {
                        const isOpen = openFAQ === index;
                        return (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-5 py-4 bg-gray-50 hover:bg-gray-100 font-medium text-gray-800 flex justify-between items-center transition-all duration-300"
                                >
                                    <span className="text-[16px] px-5">{item.question}</span>
                                    <span
                                        className={`text-orange-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                                            }`}
                                    >
                                        <FaChevronDown color="gray" size={12}  />
                                    </span>
                                </button>

                                <div
                                    className={`bg-white px-5 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] py-4' : 'max-h-0 py-0'
                                        }`}
                                >
                                    <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Carousel Section */}
            <section className="px-6">
                <h2 className="text-center text-3xl font-bold mb-10 text-[#1a1a1a]">Popular Clients</h2>
                <Carousel />
            </section>

            {/* Footer */}
            <div className="mt-[100px]">
                <Footer />
            </div>
        </div>
    );
}

export default Index;
