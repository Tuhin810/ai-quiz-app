"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import { FaUser, FaRobot } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";

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
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setMessages([
      { sender: "ai", text: "Hi there! How can I help you with this quiz? 📚" },
    ]);
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
    setIsTyping(true);

    try {
      const res = await fetch("/api/quizbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context,
          conversation: [...messages, newUserMessage],
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
    } finally {
      setIsTyping(false);
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50  w-32 bg-black text-white text-sm p-4 rounded-full shadow-xl shadow-gray-400 shadow-lg hover:scale-105 transition"
      >
        <div className="flex  justify-center items-center gap-2">
          <RiRobot2Line className="text-white" /> Ask Ai
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#212121] bg-opacity-90 flex flex-col items-center justify-end"
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-2xl font-bold mb-4"
              >
                {quizData?.text || "Let's talk about your quiz!"}
              </motion.h1>
            </div>

            <div className="w-full max-w-2xl px-4 h-[70vh] overflow-y-auto space-y-2 text-sm text-white hideScroll">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      x: msg.sender === "user" ? 100 : -100,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: msg.sender === "user" ? 100 : -100,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="flex-shrink-0 bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center mt-1">
                        <FaRobot className="text-xs" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs px-4 py-2 rounded-xl ${
                        msg.sender === "user"
                          ? "bg-purple-600 text-white rounded-br-none"
                          : "bg-[#1a1a1a] text-gray-200 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === "user" && (
                      <div className="flex-shrink-0 bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center mt-1">
                        <FaUser className="text-xs" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <div className="flex-shrink-0 bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center mt-1">
                    <FaRobot className="text-xs" />
                  </div>
                  <div className="bg-[#1a1a1a] px-4 py-2 rounded-xl text-sm animate-pulse">
                    Brew0 is typing...
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-2xl px-4 pt-4 pb-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center bg-[#1a1a1a] text-white rounded-xl p-3 shadow-inner"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Ask Brew0 a question..."
                  className="flex-1 bg-transparent px-2 text-sm outline-none placeholder-gray-500"
                />
                <div className="flex items-center gap-2 ml-2">
                  <button
                    type="submit"
                    className="p-2 rounded-full bg-white text-black hover:scale-105 transition"
                  >
                    <IoSend />
                  </button>
                </div>
              </motion.div>
            </form>

            <button
              onClick={toggleChat}
              className="absolute top-4 right-6 text-white text-xl hover:text-gray-400"
            >
              <MdClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatBot;
