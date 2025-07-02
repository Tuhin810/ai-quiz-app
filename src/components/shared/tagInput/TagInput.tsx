// components/TagsInput.tsx
"use client";
import React, { useState, useRef } from "react";
import { FiX } from "react-icons/fi";

interface TagsInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  suggestions?: string[];
}

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  setTags,
  suggestions = [],
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInput("");
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim() !== "") {
      e.preventDefault();
      addTag(input.trim());
    }
  };

  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  );

  return (
    <div className="w-lg">
      <div
        className="flex flex-wrap gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 focus:outline-none"
            >
              <FiX className="text-gray-500 hover:text-red-500" size={14} />
            </button>
          </div>
        ))}

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-none bg-transparent focus:outline-none text-sm min-w-[100px]"
          placeholder="Type and press enter..."
        />
      </div>

      {filteredSuggestions.length > 0 && (
        <div className="mt-2 border border-gray-300 rounded-lg bg-white shadow-sm max-h-40 overflow-auto">
          {filteredSuggestions.map((s, i) => (
            <div
              key={i}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => addTag(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
