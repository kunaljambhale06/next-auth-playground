"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await axios.post("/api/users/forgotpassword", { email });
      setStatus("success");
      setMessage(response.data.message);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-200">
      <h1 className="text-2xl text-gray-700 font-semibold text-center mb-[10px]">
        {loading ? "Processing..." : "Forgot Password"}
      </h1>
      <hr />

      <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-sm">

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded text-center w-full">
              {message}
            </div>
            <p className="text-sm text-gray-500">
              Didn&apos;t get it?{" "}
              <button
                onClick={() => { setStatus("idle"); setEmail(""); setMessage(""); }}
                className="text-blue-500 underline"
              >
                Try again
              </button>
            </p>
          </div>
        ) : (
          <>
            <input
              className="p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-gray-600 w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            {status === "error" && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full text-sm">
                {message}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 w-full bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}

        <Link href="/login" className="text-sm text-blue-500 underline mt-2">
          Back to Login
        </Link>
      </div>
    </div>
  );
}