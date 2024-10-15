"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDiscord, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (email.trim() === "") {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const data = JSON.stringify({ email });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://mailsender-hfm3.onrender.com/send-subscription-email",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log("Subscription successful:", response.data);
      setIsSubscribed(true);
      setMessage("You have successfully subscribed to the newsletter!");
    } catch (error) {
      setMessage("Failed to subscribe. Please try again later.");
      console.error("Error subscribing:", error);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      {/* Newsletter Section */}
      <div className="flex flex-col text-center mt-40 text-white">
        <h1 className="md:text-2xl mb-6">
          Stay updated and always receive your weekly poll alerts!
        </h1>

        <div className="relative justify-center md:mx-72 mx-8">
          <input
            type="email"
            placeholder="Enter your email address"
            className="bg-[#333333] p-4 w-full focus:border-[#00ACE3] focus:border-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="absolute right-4 bg-[#00ACE3] text-white px-6 py-2 rounded-md font-semibold mt-2"
          >
            Subscribe
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mt-4 ${
              isSubscribed ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>

      {/* Footer Links and Social Icons */}
      <footer className="mx-20 mt-40">
        <section className="flex justify-between">
          {/* Support Links */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Support</h1>
            <p className="text-[#868686] hover:text-[#00ACE3] hover:text-[#00ACE3] cursor-pointer">
              FAQ
            </p>
            <Link
              href="Contact"
              className="text-[#868686] hover:text-[#00ACE3] hover:text-[#00ACE3] cursor-pointer"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 flex flex-col">
            <h1 className="text-2xl font-bold">Quick Links</h1>
            <Link href="/" className="text-[#868686] hover:text-[#00ACE3]">
              Home
            </Link>
            <Link
              href="About"
              className="text-[#868686] hover:text-[#00ACE3] hover:text-[#00ACE3] cursor-pointer"
            >
              About Us
            </Link>
            <Link
              href="/Feature"
              className="text-[#868686] hover:text-[#00ACE3] hover:text-[#00ACE3] cursor-pointer"
            >
              Features
            </Link>
          </div>

          {/* Legal Links */}
          <div className="space-y-2 ">
            <h1 className="text-2xl font-bold">Legal</h1>
            <p className="text-[#868686] hover:text-[#00ACE3] hover:text-[#00ACE3] cursor-pointer">
              Privacy Policy
            </p>
            <p className="text-[#868686] hover:text-[#00ACE3] hover:text-[#00ACE3] cursor-pointer">
              Terms of Service
            </p>
            <p className="text-[#868686] hover:text-[#00ACE3] hover:text-[#00ACE3] cursor-pointer">
              Cookie Policy
            </p>
          </div>
        </section>

        {/* Social Media Icons */}
        <h2 className="mt-24">Connect with Us</h2>
        <div className="flex gap-4 mt-2">
          <Link href="https://discord.com/invite/AzwwvPBF">
            <FaDiscord className="w-6 h-6 text-[#00ACE3]" />
          </Link>
          <Link href="https://github.com/Plombdapp">
            <FaGithub className="w-6 h-6 text-[#00ACE3]" />
          </Link>
          <Link href=" https://x.com/plombdapp">
            <BsTwitterX className="w-6 h-6 text-[#00ACE3]" />
          </Link>
          <Link href="https://www.linkedin.com/in/plomb-dapp-6a7595323?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BYhmbz%2BlnSQClvGJtgYDmSg%3D%3D">
            <FaLinkedinIn className="w-6 h-6 text-[#00ACE3]" />
          </Link>
        </div>

        {/* Footer Text */}
        <h2 className="text-center text-lg text-[#EDEDED] mt-20">
          ©2024 PLOMB. All Rights Reserved.
        </h2>
      </footer>
    </div>
  );
}

export default Footer;
