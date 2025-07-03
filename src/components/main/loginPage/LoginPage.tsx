"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { authUser } from "@/app/api/auth/index.api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [role, setRole] = useState<"Admin" | "Participant">("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const roleValue = role === "Admin" ? 1 : 0;

    console.log("🔐 Login Info:");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", roleValue);

    try {
      const user = await authUser({
        email: email,
        password: password,
        role: roleValue, // or "Admin"
      });
      console.log("===>user ", user?.result);
      localStorage.setItem("user", JSON.stringify(user.result));
      localStorage.setItem("userId", JSON.stringify(user.result?._id));
      router.push(`/quizList`);
    } catch (error) {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full h-screen pr-20 grid grid-cols-1 lg:grid-cols-2"
    >
      {/* Left Side */}
      <div className="bg-gray-50 pl-16 py-10 border-r border-gray-200 hidden lg:flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-10 tracking-tight">
            BrainBrew
          </h1>

          <ul className="space-y-8 text-sm">
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-blue-600 text-white text-base flex items-center justify-center shadow">
                <FiCheck />
              </div>
              <div>
                <div className="font-semibold text-gray-900 flex items-center gap-1">
                  <HiOutlineUserCircle className="text-blue-500 text-lg" />
                  Your Details
                </div>
                <div className="text-gray-500">
                  Enter your name, email, and role to begin.
                </div>
              </div>
            </li>

            <li className="flex items-start gap-4 opacity-70">
              <div className="h-6 w-6 rounded-full border border-gray-300 text-sm flex items-center justify-center text-gray-600">
                2
              </div>
              <div>
                <div className="font-semibold text-gray-900 flex items-center gap-1">
                  <HiOutlineAdjustmentsHorizontal className="text-blue-500 text-lg" />
                  Quiz Preferences
                </div>
                <div className="text-gray-500">
                  Set difficulty, topics, and style.
                </div>
              </div>
            </li>

            <li className="flex items-start gap-4 opacity-70">
              <div className="h-6 w-6 rounded-full border border-gray-300 text-sm flex items-center justify-center text-gray-600">
                3
              </div>
              <div>
                <div className="font-medium text-gray-700 flex items-center gap-1">
                  <HiOutlineSparkles className="text-purple-400 text-lg" />
                  AI Assistance
                </div>
                <div className="text-gray-500">
                  Let BrewBot tailor your quiz.
                </div>
              </div>
            </li>

            <li className="flex items-start gap-4 opacity-70">
              <div className="h-6 w-6 rounded-full border border-gray-300 text-sm flex items-center justify-center text-gray-600">
                4
              </div>
              <div>
                <div className="font-medium text-gray-700 flex items-center gap-1">
                  <HiOutlineUsers className="text-green-500 text-lg" />
                  Team Battle
                </div>
                <div className="text-gray-500">
                  Invite friends & battle for trivia glory.
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="text-xs text-gray-400">support@brainbrew.ai</div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-start h-full w-full px-8">
        <div className="max-w-md w-full">
          <div className="text-3xl text-center font-bold text-gray-900 mb-2">
            Please Login
          </div>
          <p className="text-sm text-center text-gray-500 mb-6">
            Please provide your name and email.
          </p>

          <div className="flex justify-center mb-6">
            <div className="bg-gray-200 p-1 rounded-full flex items-center text-sm font-medium">
              <button
                onClick={() => setRole("Admin")}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  role === "Admin" ? "bg-black text-white" : "text-gray-700"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setRole("Participant")}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  role === "Participant"
                    ? "bg-black text-white"
                    : "text-gray-700"
                }`}
              >
                Participant
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full mt-4 bg-black hover:bg-gray-700 transition-all duration-300 py-3 rounded-xl text-white font-medium"
            >
              Continue
            </motion.button>
          </form>

          <div className="flex justify-center mt-6">
            <div className="flex gap-1">
              <div className="w-4 h-1 rounded-full bg-blue-600" />
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <div className="w-1 h-1 rounded-full bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
