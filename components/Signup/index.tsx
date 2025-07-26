"use client";

import React, { useState } from "react";
import Header from "../Header/index";
import { auth } from "../../firebase/firebase"; // Firebase auth object
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/firebase"; // Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { FiUser, FiMail, FiCreditCard, FiPhone, FiLock } from "react-icons/fi";

// const inputFields = [
//   {
//     label: "Name",
//     name: "name",
//     type: "text",
//     placeholder: "John Doe",
//     icon: <FiUser />,
//   },
//   {
//     label: "Email",
//     name: "email",
//     type: "email",
//     placeholder: "someone@example.com",
//     icon: <FiMail />,
//     error: errors.email,
//   },
//   {
//     label: "CNIC",
//     name: "cnic",
//     type: "text",
//     placeholder: "00000-0000000-0",
//     icon: <FiCreditCard />,
//     error: errors.cnic,
//   },
//   {
//     label: "Phone",
//     name: "phone",
//     type: "text",
//     placeholder: "+920000000000",
//     icon: <FiPhone />,
//     error: errors.phone,
//   },
//   {
//     label: "Password",
//     name: "password",
//     type: "password",
//     placeholder: "********",
//     icon: <FiLock />,
//     error: errors.password,
//   },
//   {
//     label: "Confirm Password",
//     name: "confirmPassword",
//     type: "password",
//     placeholder: "********",
//     icon: <FiLock />,
//     error: errors.confirmPassword,
//   },
// ]

function Index() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cnic: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    cnic: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address.";
        break;
      case "cnic":
        error = /^[0-9]{5}-[0-9]{7}-[0-9]$/.test(value)
          ? ""
          : "CNIC must be in the format 00000-0000000-0.";
        break;
      case "phone":
        error = /^\+92[0-9]{10}$/.test(value)
          ? ""
          : "Phone must start with +92 and contain 10 digits.";
        break;
      case "password":
        error = value.length >= 8 ? "" : "Password must be at least 8 characters.";
        break;
      case "confirmPassword":
        error =
          value === form.password ? "" : "Password and confirm password must match.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "credentials", user.uid), {
        name: form.name,
        email: form.email,
        cnic: form.cnic,
        phone: form.phone,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });
      router.push("/dashboard");
      console.log("User created successfully!");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center bg-[white] mt-[35px]">
        <h3 className="text-[30px] text-[#f18021] font-bold text-center">Signup</h3>
        <form className="flex flex-col items-center w-[320px]" onSubmit={handleSubmit}>
          {[
            {
              label: "Name",
              name: "name",
              type: "text",
              placeholder: "John Doe",
              icon: <FiUser />,
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "someone@example.com",
              icon: <FiMail />,
              error: errors.email,
            },
            {
              label: "CNIC",
              name: "cnic",
              type: "text",
              placeholder: "00000-0000000-0",
              icon: <FiCreditCard />,
              error: errors.cnic,
            },
            {
              label: "Phone",
              name: "phone",
              type: "text",
              placeholder: "+920000000000",
              icon: <FiPhone />,
              error: errors.phone,
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "********",
              icon: <FiLock />,
              error: errors.password,
            },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
              placeholder: "********",
              icon: <FiLock />,
              error: errors.confirmPassword,
            },
          ].map((field, index) => (
            <div className="mt-3 flex flex-col w-full" key={index}>
              <label className="text-[14px] text-[#191919]" htmlFor={field.name}>
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {field.icon}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  onChange={handleOnChange}
                  className="bg-[#eee] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  placeholder={field.placeholder}
                  required
                />
              </div>
              {field.error && <span className="text-red-500 text-sm">{field.error}</span>}
            </div>
          ))}

          <div className="mt-3 w-full">
            <button
              type="submit"
              className="text-[#f0f0f0] font-bold rounded-lg py-2 bg-[#f18021] border border-black-500 w-full"
            >
              {loading ? <BeatLoader size={10} color="#f0f0f0" /> : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Index;
