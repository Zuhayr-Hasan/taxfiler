"use client";

import React, { useState } from "react";
import Header from "../Header";
import Carousel from "../Elements/Carousel";
import Footer from "../Footer";

const taxBrackets: Record<string, { threshold: number; rate: number }[]> = {
    "2025-26": [
        { threshold: 600000, rate: 0 },
        { threshold: 1200000, rate: 0.05 },
        { threshold: 2400000, rate: 0.1 },
        { threshold: 3600000, rate: 0.15 },
        { threshold: Infinity, rate: 0.2 },
    ],
};

function SalaryTaxCalculator() {
    const [year, setYear] = useState("2025-26");
    const [income, setIncome] = useState<number | string>("");
    const [monthly, setMonthly] = useState({ salary: 0, tax: 0, afterTax: 0 });
    const [yearly, setYearly] = useState({ salary: 0, tax: 0, afterTax: 0 });

    const calculateTax = () => {
        const yearlyIncome = typeof income === "string" ? Number(income) : income;
        const brackets = taxBrackets[year];
        let remaining = yearlyIncome;
        let tax = 0;
        let lastThreshold = 0;
    
        for (const bracket of brackets) {
            const taxable = Math.min(bracket.threshold - lastThreshold, remaining);
            if (taxable > 0) {
                tax += taxable * bracket.rate;
                remaining -= taxable;
                lastThreshold = bracket.threshold;
            }
        }
    
        setYearly({
            salary: yearlyIncome,
            tax: Math.round(tax),
            afterTax: Math.round(yearlyIncome - tax),
        });
        setMonthly({
            salary: Math.round(yearlyIncome / 12),
            tax: Math.round(tax / 12),
            afterTax: Math.round((yearlyIncome - tax) / 12),
        });
    };    

    return (
        <div className="text-gray-800">
            <Header />

            <section className="py-20 bg-orange-50 px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">Salary Tax Calculator</h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-700">
                    Apart from compliance, signing up with our online tax return portal allows you to access an easy-to-use tax return calculator. Our calculator is updated with the latest tax regulations in Pakistan.
                </p>
            </section>

            <section className="py-10 px-6 max-w-2xl mx-auto">
                <div className="flex flex-col gap-4 items-center">
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border p-3 rounded w-full"
                    >
                        {Object.keys(taxBrackets).map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Enter your yearly salary"
                        className="border p-3 rounded w-full"
                        value={income}
                        onChange={(e) => {
                            const val = e.target.value;
                            setIncome(val === "" ? "" : Number(val));
                        }}
                    />
                    <button
                        onClick={calculateTax}
                        className="rounded-lg bg-[#f18021] hover:bg-orange-600 text-white px-6 py-3 rounded text-lg font-semibold"
                    >
                        Calculate
                    </button>
                </div>
            </section>

            {/* Monthly Results */}
            <section className="bg-white py-10 px-6 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-6">Monthly Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 border rounded">
                        <p className="text-sm text-gray-500">Monthly Salary</p>
                        <p className="text-xl font-bold">Rs. {monthly.salary}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <p className="text-sm text-gray-500">Monthly Tax</p>
                        <p className="text-xl font-bold">Rs. {monthly.tax}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <p className="text-sm text-gray-500">Salary After Tax</p>
                        <p className="text-xl font-bold">Rs. {monthly.afterTax}</p>
                    </div>
                </div>
            </section>

            {/* Yearly Results */}
            <section className="bg-orange-50 py-10 px-6 max-w-4xl mx-auto rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Yearly Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 border rounded">
                        <p className="text-sm text-gray-500">Yearly Salary</p>
                        <p className="text-xl font-bold">Rs. {yearly.salary}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <p className="text-sm text-gray-500">Yearly Tax</p>
                        <p className="text-xl font-bold">Rs. {yearly.tax}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <p className="text-sm text-gray-500">Salary After Tax</p>
                        <p className="text-xl font-bold">Rs. {yearly.afterTax}</p>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Popular Clients</h2>
                <Carousel />
            </section>

            <Footer />
        </div>
    );
}

export default SalaryTaxCalculator;
