import React, { useState } from "react";
import api from "../../api";
import type { Signup } from "../types";
import { useNavigate } from "react-router-dom";


export default function StudentLogin() {
  const navigate= useNavigate();

  const [formData, setFormData] = useState<Signup>({
    studentId: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/login/student", formData);
      setSuccess("Login successful!");
      console.log("Response:", response.data);
      navigate('/student-dashboard')
      //handle token storage or redirect
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
          <h2 className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Student Login
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Welcome Back!!
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="studentId" className="text-sm font-medium text-gray-700">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID"
                className="w-full rounded-md border px-3 py-2 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-md border px-3 py-2 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md shadow-lg hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Login to Dashboard
            </button>
          </form>

          {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
          {success && <p className="text-green-600 mt-4 text-sm">{success}</p>}
        </div>
      </div>
    </div>
  );
}