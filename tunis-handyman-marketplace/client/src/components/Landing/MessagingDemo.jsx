import React, { useState } from "react";
import { FaCheckDouble, FaPaperPlane } from "react-icons/fa6";

const MessagingDemo = () => {
  const [messages] = useState([
    {
      id: 1,
      sender: "Ahmed (Professional)",
      avatar: "👨‍🔧",
      content:
        "Hi! I can help with your plumbing issue. I have 8 years of experience.",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      avatar: "👤",
      content: "Great! How quickly can you come take a look at the leak?",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Ahmed (Professional)",
      avatar: "👨‍🔧",
      content:
        "I can be there within 2 hours. The inspection is free, and I'll give you a detailed quote.",
      timestamp: "10:36 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      avatar: "👤",
      content: "Perfect! See you soon. What's your rate?",
      timestamp: "10:40 AM",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Ahmed (Professional)",
      avatar: "👨‍🔧",
      content:
        "My hourly rate is 50 TND. I'm highly rated with 4.9 stars from 127 reviews.",
      timestamp: "10:41 AM",
      isOwn: false,
    },
  ]);

  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Direct Communication
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Connect directly with professionals right on our platform.
              Message, negotiate, and agree on terms before starting any work.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Real-time messaging with professionals",
                "Secure communication within the platform",
                "Share photos and project details",
                "Negotiable pricing and timeline",
                "Activity history for reference",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckDouble className="text-emerald-500 text-lg" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-gray-500 italic">
              💡 Tip: Always communicate through our platform to keep your data
              secure and have a record of all discussions.
            </p>
          </div>

          {/* Right side - Chat interface */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-96 border border-gray-200">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 flex items-center gap-3">
              <span className="text-3xl">👨‍🔧</span>
              <div>
                <h3 className="font-bold">Ahmed - Plumber</h3>
                <p className="text-sm text-emerald-100">Active now</p>
              </div>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.isOwn ? "justify-end" : "justify-start"}`}
                >
                  {!msg.isOwn && <span className="text-2xl">{msg.avatar}</span>}

                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.isOwn
                        ? "bg-emerald-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.isOwn ? "text-emerald-100" : "text-gray-500"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>

                  {msg.isOwn && <span className="text-2xl">{msg.avatar}</span>}
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="bg-white border-t border-gray-200 p-4 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagingDemo;
