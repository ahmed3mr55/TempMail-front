"use client";
import React from "react";
import { useState } from "react";
import Spinner from "./Spinner";
import CustomEmail from "./CustomEmail";
import { useEmail } from "../context/EmailContext";

const CreateMail = () => {
  const [expires, setExpires] = useState("30m");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    handleGenerateEmail,
    email,
    isEmailValid,
    isEmailLoading,
    emailError,
  } = useEmail();

  const handleCreateEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      await handleGenerateEmail({ ttl: expires });
      location.href = "/inbox";
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Misho</h1>
          <p className="text-gray-500 mt-1">Temporary Email Service</p>
        </header>

        {/* Actions */}
        <main className="flex flex-col items-center gap-4">
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCreateEmail}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              {isEmailLoading ? <Spinner /> : "Create New Email"}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="flex-1 bg-gray-600 text-white py-3 rounded-xl hover:bg-gray-700 transition-colors"
            >
              Choose Custom Name
            </button>
          </div>

          <div className="w-full">
            <label htmlFor="expires" className="block text-gray-700 mb-2">
              Expires In:
            </label>
            <select
              id="expires"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="30m">30 minutes(default)</option>
              <option value="1h">1 hour</option>
              <option value="2h">2 hours</option>
              <option value="12h">12 hours</option>
              <option value="1d">24 hours</option>
              <option value="3d">3 days</option>
              <option value="7d">7 days</option>
              <option value="14d">14 days</option>
              <option value="21d">21 days</option>
              <option value="30d">30 days</option>
            </select>
          </div>
        </main>
      </div>
      {isOpen && (
        <CustomEmail onClose={() => setIsOpen(false)} expires={expires} />
      )}
    </div>
  );
};

export default CreateMail;
