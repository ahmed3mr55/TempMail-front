"use client";
import React from "react";
import { useEmail } from "../context/EmailContext";
import { RefreshCw } from "lucide-react";

const Renew = () => {
    const { handleGenerateEmail } = useEmail();
    const handleRenew = async () => {
        try {
            await handleGenerateEmail({ ttl: "30m" });
            location.href = "/inbox";
        } catch (error) {
            console.error("Failed to renew email:", error);
        }
    }
  return (
    <button
        onClick={handleRenew}
      className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      Renew <RefreshCw size={16} />
    </button>
  );
};

export default Renew;
