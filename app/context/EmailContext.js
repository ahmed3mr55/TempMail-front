"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);

  // get details email
  const [createdAt, setCreatedAt] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [isGetDetailsLoading, setIsGetDetailsLoading] = useState(false);
  const [getDetailsError, setGetDetailsError] = useState(null);

  // get messages
  const [inboxEmail, setInboxEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  const handleGenerateEmail = async ({ ttl }) => {
    setIsEmailLoading(true);
    setEmailError(null);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tempMail/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ttl }),
        }
      );
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.message || "Failed to generate email");
      }
      setIsEmailValid(true);
      setEmail(res.email);
      console.log("Generated Email:", res.email);
    } catch (error) {
      setEmailError("Failed to generate email. Please try again.");
    } finally {
      setIsEmailLoading(false);
    }
  };

  const getDetails = async () => {
    setIsGetDetailsLoading(true);
    setGetDetailsError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tempMail/check-email`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setEmail(data.email);
      setCreatedAt(new Date(data.createdAt));
      setExpiresAt(new Date(data.expiresAt));
      setInboxEmail(data.email);
    } catch (err) {
      setGetDetailsError(err.message);
    } finally {
      setIsGetDetailsLoading(false);
    }
  };
  const getMessages = async () => {
    setIsMessagesLoading(true);
    setMessagesError(null);
    try {
      const req = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL}/api/message/inbox/messages/email`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.error || "Failed to fetch messages");
      }
      setMessages(res.messages || res); // depending on your API shape
    } catch (err) {
      setMessagesError(err.message || "Failed to fetch messages");
    } finally {
      setIsMessagesLoading(false);
    }
  };

  return (
    <EmailContext.Provider
      value={{
        email,
        setEmail,
        isEmailValid,
        setIsEmailValid,
        isEmailLoading,
        setIsEmailLoading,
        emailError,
        setEmailError,
        handleGenerateEmail,
        createdAt,
        setCreatedAt,
        expiresAt,
        getDetails,
        isGetDetailsLoading,
        getMessages,
        messages,
        messagesError,
        isMessagesLoading,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);
