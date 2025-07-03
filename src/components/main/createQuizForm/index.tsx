"use client";
import TagsInput from "@/components/shared/tagInput/TagInput";
import React, { use, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { createQuiz } from "@/app/api/createQuize/index.api";

const CreateQuizForm = () => {
  const [formData, setFormData] = useState({
    userId: "68642c6383001c04b2de6833",
    title: "",
    description: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload: any = {
        ...formData,
        tags,
      };

      const response = await createQuiz(payload);
      console.log("======> quiz id :", response?.result?._id);
      setMessage("✅ Quiz created successfully!");
      router.push(`/addquestion?quizId=${response?.result?._id}`);
    } catch (error) {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl px-10 mt-10 p-6 bg-white rounded-2xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-800">
          Create New Quiz
        </h2>
        <p className="text-sm text-gray-500">
          Fill in the details to create your quiz.
        </p>
      </div>

      <form onSubmit={handleSubmit} className=" space-y-5">
        <div className="w-full flex justify-between ">
          <div className="space-y-5 h-68">
            {/* Title */}
            <div className="w-xl mr-10">
              <label className="block text-md text-gray-600 font-medium mb-1">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm bg-gray-50"
                placeholder="e.g. DevOps Master Quiz"
              />
            </div>
            {/* Description */}
            <div className="w-xl">
              <label className="block text-md text-gray-600 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm bg-gray-50"
                placeholder="e.g. JS, scope, closures, ES6..."
              />
            </div>
          </div>

          <div>
            <label className="block text-md text-gray-600 font-medium mb-1">
              Tags
            </label>
            <TagsInput
              tags={tags}
              setTags={setTags}
              suggestions={[
                "DevOps",
                "Frontend",
                "Node.js",
                "Cloud",
                "Automation",
              ]}
            />
          </div>
        </div>

        {/* Tags */}

        {/* Submit Button */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white text-md rounded-lg transition-all duration-200 ${
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Go Next"}
          </button>
          {message && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <FiCheckCircle />
              <span>{message}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateQuizForm;
