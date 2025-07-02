"use client";
import React, { useState } from "react";
import {
  FiClock,
  FiUsers,
  FiClipboard,
  FiBookOpen,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import clsx from "clsx";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import { TiBookmark } from "react-icons/ti";
import { MdOutlineTry } from "react-icons/md";
import { TbHome } from "react-icons/tb";
import Link from "next/link";

export const UserSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <div
      className={clsx(
        "h-screen bg-gray-100 shadow border-r border-gray-200 p-4 flex flex-col text-sm font-medium relative transition-all duration-300 ease-in-out",
        isExpanded ? "w-72" : "w-20"
      )}
    >
      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="absolute text-white  font-semibold -right-4 top-4 w-9 h-9 rounded-full bg-gray-700  shadow-xl shadow-gray-300  flex items-center justify-center "
      >
        {isExpanded ? (
          <LuArrowLeftToLine size={16} />
        ) : (
          <LuArrowRightToLine size={16} />
        )}
      </button>

      {/* Logo */}
      <div
        className={clsx(
          "text-xl font-bold text-primary mb-6 px-2",
          !isExpanded && "text-center"
        )}
      >
        {isExpanded ? "Dashboard" : "📘"}
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mt-12">
        <SidebarItem
          route={"/quizList"}
          icon={<TbHome size={22} />}
          label="Home"
          isExpanded={isExpanded}
        />
        <SidebarItem
          route={"/attempted"}
          icon={<MdOutlineTry size={22} />}
          label="Attempted"
          isExpanded={isExpanded}
        />
        <SidebarItem
          route={"/bookmark"}
          icon={<TiBookmark size={22} />}
          label="Saved"
          isExpanded={isExpanded}
        />
        <SidebarItem
          route={"/createQuiz"}
          icon={<TiBookmark size={22} />}
          label="Create Quiz"
          isExpanded={isExpanded}
        />
        <SidebarItem
          route={"/bookmark"}
          icon={<TiBookmark size={22} />}
          label="Saved"
          isExpanded={isExpanded}
        />
      </nav>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  isExpanded,
  route,
}: {
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  route: any;
}) => (
  <Link
    href={route}
    className={clsx(
      "flex items-center border border-gray-300 gap-3 p-3 shadow-sm hover:shadow-md rounded-xl bg-white hover:text-gray-100 hover:bg-blue-500 cursor-pointer transition-all",
      !isExpanded && "justify-center"
    )}
  >
    <span className="text-xl">{icon}</span>
    {isExpanded && <span>{label}</span>}
  </Link>
);

const FavoriteItem = ({
  color,
  label,
  isExpanded,
}: {
  color: string;
  label: string;
  isExpanded: boolean;
}) => (
  <div
    className={clsx(
      "flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer",
      !isExpanded && "justify-center"
    )}
  >
    <div className={`w-3 h-3 rounded-full ${color}`} />
    {isExpanded && <span>{label}</span>}
  </div>
);

const ProjectItem = ({
  color,
  label,
  isExpanded,
}: {
  color: string;
  label: string;
  isExpanded: boolean;
}) => (
  <div
    className={clsx(
      "flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer",
      !isExpanded && "justify-center"
    )}
  >
    <div className={`w-3 h-3 rounded-full ${color}`} />
    {isExpanded && <span>{label}</span>}
  </div>
);

const SectionHeader = ({
  title,
  count,
  isExpanded,
}: {
  title: string;
  count: number;
  isExpanded: boolean;
}) => (
  <div className="flex justify-between items-center px-2 text-gray-500 uppercase text-xs mb-2">
    {isExpanded ? (
      <>
        <span>
          {title} {count}
        </span>
        <FiPlus className="cursor-pointer hover:text-black" size={12} />
      </>
    ) : (
      <FiPlus className="ml-auto cursor-pointer hover:text-black" size={12} />
    )}
  </div>
);

export default UserSidebar;
