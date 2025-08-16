"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import Alert from "./Alert";

const CustomEmail = ({ onClose, expires }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const subdomains = [
    "@in.misho.cfd",
    "@me.misho.cfd",
    "@us.misho.cfd",
    "@you.misho.cfd",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subdomain.trim()) {
      setError("Please enter a valid email name");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tempMail/generate/${subdomain}${selectedDomain}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ttl: expires }),
          credentials: "include",
        }
      );
      const res = await req.json();
      if (!req.ok) {
        setError(res.error || "Failed to create email");
        return;
      }
      onClose();
      location.href = "/inbox";
    } catch (err) {
      setError("Failed to create email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const randomDomain =
      subdomains[Math.floor(Math.random() * subdomains.length)];
    setSelectedDomain(randomDomain);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            Create Custom Email
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <label
            htmlFor="subdomain"
            className="block text-sm font-medium text-gray-700"
          >
            Email Name
          </label>
          <div className="flex items-center">
            <input
              id="subdomain"
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              placeholder="Enter custom name"
              className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="border border-gray-300 rounded-r-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="subdomain"
            >
              {subdomains.map((domain, index) => (
                <option key={index} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          {expires && (
            <p className="text-xs text-gray-500">
              Expires in: <span className="font-medium">{expires}</span>
            </p>
          )}

          {error && <Alert message={error} type="error" />}
        </div>

        {/* Actions */}
        <div className="p-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Create Email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomEmail;
