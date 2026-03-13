"use client";

import Link from "next/link";
import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No reset token found. Please request a new reset link.");
    }
  }, [token]);

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const response = await axios.post("/api/users/resetpassword", { token, password });
      setStatus("success");
      setMessage(response.data.message);
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">
        {loading ? "Resetting..." : "Reset Password"}
      </h1>
      <hr />

      <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-sm">

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded text-center w-full">
              {message}
            </div>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <>
            {!token ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full text-sm">
                  {message}
                </div>
                <Link href="/forgotpassword" className="text-blue-500 underline text-sm">
                  Request a new reset link
                </Link>
              </div>
            ) : (
              <>
                <input
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 w-full"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password (min. 6 chars)"
                />

                <input
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 w-full"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />

                {status === "error" && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full text-sm">
                    {message}
                  </div>
                )}

                <button
                  onClick={handleReset}
                  disabled={loading || !password || !confirmPassword}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 w-full bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}
          </>
        )}

        <Link href="/login" className="text-sm text-blue-500 underline mt-2">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}