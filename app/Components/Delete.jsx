"use client";
import React from "react";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import Alert from "./Alert";
import Spinner from "./Spinner";
import Cookies from "js-cookie";

const Delete = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tempMail/delete/${email}`,
        {
          method: "DELETE",
        }
      );
      const res = await req.json();
      if (!req.ok) {
        setError(res.error || "Failed to delete email");
        return;
      }
      Cookies.remove("Email", { path: "/", sameSite: "lax" });
      location.href = "/";
    } catch (error) {
      setError("Failed to delete email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        <Trash2 size={16} /> Delete
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center ">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold text-center text-red-600">
              Delete Email
            </h2>
            <p className="mb-4 text-center">
              Are you sure you want to delete this email?
            </p>
            {error && <Alert type="error" message={error} />}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEmail}
                disabled={loading}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 text-white cursor-pointer"
              >
                {loading ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Delete;
