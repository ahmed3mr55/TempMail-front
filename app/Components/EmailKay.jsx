"use client";
import React, { useState } from "react";
import { KeyRound, X, Copy } from "lucide-react";
import { useEmail } from "../context/EmailContext";

const EmailKey = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { password } = useEmail();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        title="View Email Password"
      >
        <KeyRound size={18} className="text-gray-700" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center animate-fadeIn">
          <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-lg animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition"
              title="Close"
            >
              <X size={18} className="text-gray-500" />
            </button>

            <h2 className="mb-4 text-2xl font-bold text-center text-red-600">
              Email Password
            </h2>
            <p className="mb-4 text-center text-gray-700">
              Your temporary email password is:
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-4 py-2 bg-gray-100 rounded-lg font-mono text-red-600 text-lg shadow-inner">
                {password}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition flex items-center gap-1"
              >
                <Copy size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 cursor-pointer bg-gray-500 rounded-lg hover:bg-gray-600 text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default EmailKey;
