"use client";
import React, { useEffect, useState } from "react";
import { RefreshCw, Copy } from "lucide-react";
import { useEmail } from "../context/EmailContext";
import ViewMessage from "./ViewMessage";

const parseFrom = (from) => {
  const match = from.match(/^(.*) <(.*)>$/);
  if (match) {
    return { name: match[1].replace(/"/g, ""), email: match[2] };
  }
  return { name: null, email: from };
};

const EmailList = () => {
  const {
    getMessages,
    isMessagesLoading: loading,
    messagesError: error,
    messages,
  } = useEmail();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // Fetch messages on mount
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="w-full bg-white shadow-xl min-h-[60vh] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Inbox</h2>
        <button
          onClick={getMessages}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          <span className="font-medium">Refresh</span>
        </button>
      </div>

      {/* Content */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-600">No messages found.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map(({ _id, from, subject }) => {
            const { name, email } = parseFrom(from);
            const display = name || email;
            const initials = display
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <li
                key={_id}
                onClick={() => {
                  setSelectedMessageId(_id);
                  setIsOpen(true);
                }}
                className="flex items-center mb-3 justify-between w-full m-auto bg-gray-50 rounded-2xl p-4 shadow-inner hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    {initials}
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold break-all">
                      {display}
                    </p>
                    <p className="text-gray-600 text-sm truncate max-w-xs">
                      {subject}
                    </p>
                  </div>
                </div>

              </li>
            );
          })}
          {isOpen && (
            <ViewMessage
              id={selectedMessageId}
              onClose={() => {
                setIsOpen(false);
                setSelectedMessageId(null);
              }}
            />
          )}
        </ul>
      )}
    </div>
  );
};

export default EmailList;
