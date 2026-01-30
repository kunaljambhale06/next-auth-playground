"use client"; 
import { useRouter } from "next/navigation"; 

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome To Complete Next JS authentication system
        </h1>
        <p className="text-gray-600 mb-6">
This project showcases a complete authentication workflow using Next.js App Router, JWT-based sessions, and MongoDB.
It focuses on secure login, signup, route protection, and real-world authentication patterns.        </p>
        <div className="flex justify-center gap-8">
          <button
            onClick={() => router.push("/login")}
            className="w-40 px-10 py-4 text-lg bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-10 py-4 text-lg bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
