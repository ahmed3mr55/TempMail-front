"use client";
import React, { useEffect, useState } from "react";
import { X, Loader2, Copy, Code, Mail, ArrowRightCircle, Calendar } from "lucide-react";

const ViewMessage = ({ id, onClose }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/message/inbox/message/${encodeURIComponent(id)}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load message");
        setMessage(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();

    // Close on overlay click
    const handleClick = (e) => {
      if (e.target.id === "modal-overlay") onClose();
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [id, onClose]);

  return (
    <div id="modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-auto max-h-[90vh] animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-6 space-y-6">
          {loading && (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="animate-spin" size={18} /> Loading…
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && message && (
            <>
              {/* Details with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg shadow-sm">
                  <Mail size={24} className="text-blue-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-blue-600">From</p>
                    <p className="text-sm text-gray-800 break-all">{message.from}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg shadow-sm">
                  <ArrowRightCircle size={24} className="text-green-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-green-600">To</p>
                    <p className="text-sm text-gray-800 break-all">{message.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg shadow-sm">
                  <Calendar size={24} className="text-purple-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-purple-600">Date</p>
                    <p className="text-sm text-gray-800">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="border-b pb-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {message.subject}
                </h3>
              </div>

              {/* HTML Content */}
              {message.html && (
                <div className="prose max-w-none p-6 bg-white rounded-lg shadow-inner">
                  <div dangerouslySetInnerHTML={{ __html: message.html }} />
                </div>
              )}

              {/* Raw Source */}
              <details className="mt-6 bg-gray-100 p-4 rounded-lg">
                <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                  <Code size={16} /> Raw Source
                </summary>
                <div className="mt-2 overflow-auto max-h-60 font-mono text-xs text-gray-600">
                  <pre className="whitespace-pre-wrap">{message.raw}</pre>
                </div>
              </details>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMessage;
