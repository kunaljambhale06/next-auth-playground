'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login Successful", response.data)
      toast.success("Login Successful")
      router.push("/profile")

    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong in Login! Please try again later."
      console.log("Login failed", error.message)
      toast.error(message);
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

return (
  <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">

    <div className="max-w-sm bg-white px-6 py-8 rounded-lg shadow-md">

      <h1 className="text-2xl text-gray-700 font-semibold text-center mb-[10px]">
        {loading ? "Processing" : "Login"}
      </h1>

      <hr className="mb-[10px]" />

      <div className="flex flex-col space-y-[10px]">
      
        <div className="flex flex-col space-y-[10px] text-gray-700">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-[10px] text-gray-700">
          <label htmlFor="password" className="text-sm">
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              className="p-2 border border-gray-300 rounded-md text-black w-full pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={user.password.length === 0}
              className={`absolute right-2 top-1/2 -translate-y-1/2 
                ${user.password.length === 0 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-gray-600 hover:text-gray-800 cursor-pointer"
                }`}
            >
              {showPassword ? (
                /* Eye Off SVG */
                <svg xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.8} 
                  stroke="currentColor" 
                  className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M3 3l18 18M10.584 10.587a2 2 0 002.829 2.829M9.878 5.08A9.956 9.956 0 0112 5c5.523 0 10 7 10 7a17.764 17.764 0 01-2.293 2.942M6.61 6.61A17.765 17.765 0 002 12s4.477 7 10 7a9.956 9.956 0 004.122-.92" />
                </svg>
              ) : (
                /* Eye SVG */
                <svg xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.8} 
                  stroke="currentColor" 
                  className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M2.25 12s4.5-7.5 9.75-7.5S21.75 12 21.75 12 17.25 19.5 12 19.5 2.25 12 2.25 12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          className={`bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 ${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          type="button"
          onClick={onLogin}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

      <Link
        href="/signup"
        className="block text-center mt-[10px] text-blue-600 hover:underline"
      >
        New User? Visit Signup Page
      </Link> 

    </div>
  </div>
)
}
