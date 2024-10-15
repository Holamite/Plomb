"use client";

import React, { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !message) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://mailsender-hfm3.onrender.com/send-contact-email",
        {
          name,
          email,
          phoneNumber,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage("");

      setName("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to send the message. Please try again later.");
      setSuccessMessage("");

      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div
      className="text-white w-full bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/assets/contact-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-[#00ACE3] text-2xl text-center font-semibold pt-32">
        Contact Us
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto mt-16 bg-[#252525] p-8 rounded-lg shadow-md"
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-[#9E9E9E]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="shadow-sm bg-[#333333] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-[#9E9E9E]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="shadow-sm bg-[#333333] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-[#9E9E9E]"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="shadow-sm bg-[#333333] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-[#9E9E9E]"
          >
            Message
          </label>
          <textarea
            id="message"
            // rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave your message"
            className="block p-2.5 w-full text-sm text-white bg-[#333333] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mt-4">{successMessage}</div>
        )}

        <div className="flex justify-between">
          <div></div>
          <button
            type="submit"
            className="bg-[#00ACE3] px-6 py-2 rounded-md font-semibold mt-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;
