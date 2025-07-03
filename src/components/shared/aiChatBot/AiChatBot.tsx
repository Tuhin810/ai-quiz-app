"use client";

import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const AiChatBot = ({ quizData }: any) => {
  const [context, setContext] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "Hi there! How can I help you with this quiz? 📚" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    console.log("==> Context:", context);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: Message = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    try {
      const res = await fetch("/api/quizbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context,
          conversation: [...messages, newUserMessage], // full history
        }),
      });

      const data = await res.json();
      const aiReply: Message = {
        sender: "ai",
        text: data.reply || "🤖 Sorry, I didn’t get that.",
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("AI Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "🤖 Sorry, something went wrong!",
        },
      ]);
    }
  };

  useEffect(() => {
    if (quizData && typeof quizData === "object" && quizData.text) {
      const extracted: any = {
        question: quizData.text,
        correctAnswer: quizData.correctOption?.text || "N/A",
        MyselectedAnswer: quizData.selectedOption?.text || "Not answered",
      };
      console.log("📦 Quiz Context:", extracted);
      setContext(extracted);
    }
  }, [quizData]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-white text-black p-4 rounded-full shadow-lg hover:scale-105 transition"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-95 flex flex-col items-center justify-end">
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-white text-2xl font-bold mb-6">
              {quizData.text}
            </h1>
          </div>

          <div className="w-full max-w-4xl px-4 pb-2 h-[400px] overflow-y-auto space-y-2 text-sm text-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-[#1a1a1a] text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-4xl px-4 pb-8">
            <div className="flex items-center bg-[#1a1a1a] text-white rounded-xl p-3 shadow-inner">
              <button type="button" className="text-xl text-gray-400 px-2">
                <FiPaperclip />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Ask v0 a question..."
                className="flex-1 bg-transparent px-2 text-sm outline-none placeholder-gray-500"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="bg-[#292929] text-gray-200 text-xs px-3 py-1 rounded-md border border-gray-600"
                >
                  + Project
                </button>
                <button
                  type="submit"
                  className="p-2 rounded-full bg-white text-black"
                >
                  <IoSend />
                </button>
              </div>
            </div>
          </form>

          <button
            onClick={toggleChat}
            className="absolute top-4 right-6 text-white text-xl hover:text-gray-400"
          >
            <MdClose />
          </button>
        </div>
      )}
    </>
  );
};

export default AiChatBot;
