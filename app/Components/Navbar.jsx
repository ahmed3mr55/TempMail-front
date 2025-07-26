"use client";
import React from "react";
import { Mail } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full py-4 bg-white shadow-lg z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo & Title */}
        <div onClick={() => window.location.href = "/"} className="flex items-center space-x-3">
          <Mail size={28} className="text-blue-600" />
          <h1 className="text-xl lg:text-2xl font-extrabold text-gray-800">
            Misho
          </h1>
          <span className="hidden sm:inline-block text-sm text-gray-500">
            Temp Email Service
          </span>
        </div>

        {/* Navigation Links (if needed) */}
        <div className="hidden md:flex space-x-6">
          <a href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden sm:block">
          <a
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Email
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="p-2 rounded-md hover:bg-gray-200 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
