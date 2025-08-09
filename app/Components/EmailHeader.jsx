"use client";
import React, { useEffect, useState } from "react";
import { Mail, Copy, RefreshCw, Trash2, Check, KeyRound } from "lucide-react";
import { useEmail } from "../context/EmailContext";
import Delete from "./Delete";
import Renew from "./Renew";
import CustomEmail from "./CustomEmail";
import EmailKay from "./EmailKay";

const EmailHeader = () => {
  const {
    email,
    createdAt,
    expiresAt,
    getDetails,
    isGetDetailsLoading: loading,
    getDetailsError: error,
    getMessages,
  } = useEmail();
  const [isOpen, setIsOpen] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [isCopySuccess, setIsCopySuccess] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (!createdAt || !expiresAt) return;
    const tick = () => {
      const diff = expiresAt.getTime() - Date.now();
      setRemainingMs(diff > 0 ? diff : 0);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [createdAt, expiresAt]);

  const totalDuration =
    createdAt && expiresAt ? expiresAt.getTime() - createdAt.getTime() : 0;
  const percentage =
    totalDuration > 0 ? (remainingMs / totalDuration) * 100 : 0;
  const formatTime = (ms) => {
    const sec = Math.floor(ms / 1000),
      h = Math.floor(sec / 3600),
      m = Math.floor((sec % 3600) / 60),
      s = sec % 60;
    return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setIsCopySuccess(true);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 grid md:grid-cols-3 gap-6">
      {/* Custom Email Modal */}
      {isOpen && <CustomEmail onClose={() => setIsOpen(false)} />}

      {/* Header */}
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Mail size={28} className="text-blue-600" />
        <h1 className="text-3xl font-extrabold">Misho</h1>
        <span className="text-sm text-gray-500">Temp Email Service</span>
      </div>

      {/* Email Info */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h2 className="text-lg font-semibold">Your Email</h2>
        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="break-all">{email}</p>
              <div className="flex space-x-2">
                {isCopySuccess ? (
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <Check size={18} className="text-green-600" />
                  </button>
                ) : (
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <Copy size={18} />
                  </button>
                )}

                <EmailKay />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setIsOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCw size={16} /> Change
              </button>
              <Renew />
              <Delete email={email} />
            </div>
          </>
        )}
      </div>

      {/* Time Remaining */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h2 className="text-lg font-semibold">Time Remaining</h2>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-3 transition-all duration-1000 ease-linear"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2">{formatTime(remainingMs)} remaining</p>
      </div>
    </div>
  );
};

export default EmailHeader;
