"use client";
import React, { useState } from "react";
import { X, LogIn } from "lucide-react";
import Alert from "./Alert";
import Spinner from "./Spinner";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const res = await req.json();
      if (!req.ok) {
        setError(res.error || "Failed to login");
        return;
      }
      setSuccess("Logged in successfully...");
      location.href = "/inbox";
    } catch (error) {
      setError(error.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center">
      <div className="relative bg-gray-100 rounded-lg shadow-md lg:p-12 md:p-8 sm:p-6 p-4 w-full max-w-md">

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Local Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@in.misho.cfd"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                checked={showPassword}
                id="checkbox"
                onChange={() => setShowPassword((prev) => !prev)}
                className="mr-2"
              />
              <label className="text-sm" htmlFor="checkbox">
                Show password
              </label>
            </div>
          </div>

          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}

          <button
            type="submit"
            disabled={loading}
            className="disabled:opacity-50 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <LogIn size={20} className="inline-block me-1" />
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
