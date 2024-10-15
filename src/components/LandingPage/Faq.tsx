"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is PLOMB?",
    answer:
      "PLOMB is a decentralized voting platform that uses blockchain technology to ensure transparency and eliminate voting rigging.",
  },
  {
    question: "How does PLOMB ensure transparency?",
    answer:
      "By utilizing blockchain technology, PLOMB ensures that every vote is securely recorded and cannot be tampered with.",
  },
  {
    question: "Is PLOMB easy to use?",
    answer:
      "Yes, PLOMB is designed with user experience in mind, making it easy for anyone to create and participate in polls.",
  },
  {
    question: "Can I create a poll on PLOMB?",
    answer:
      "Yes, you can easily create polls on PLOMB. Just navigate to the 'Create Poll' section and follow the prompts.",
  },
  {
    question: "How secure is PLOMB?",
    answer:
      "PLOMB uses advanced encryption and blockchain technology to ensure that your votes are secure and private.",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#252525] text-white w-full ">
      <div className=" p-4 py-10">
        <h1 className="text-3xl font-bold text-center text-[#00ACE3] mb-10 pt-10">
          Frequently Asked Questions
        </h1>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#313131] shadow-md rounded-md p-5 cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[#00ACE3]">
                  {faq.question}
                </h2>
                <span
                  className={`transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ⯆
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-4 text-gray-200">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
