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

      {/* EXACT 10px vertical spacing between ALL blocks */}
      <div className="flex flex-col space-y-[10px]">
      
        <div className="flex flex-col space-y-10px] text-gray-700">
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

        <div className="flex flex-col space-y-[10px] text-gray-700">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <button
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
