'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Sign-Up Successful", response.data)
      toast.success("Sign-Up Successful ! Please verify your email.")
      router.push("/verifyemail")


    } catch (error: any) {
      console.log("Signup failed", error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

    <div className="max-w-sm bg-white px-6 py-8 rounded-lg shadow-md">

      <h1 className="text-2xl text-gray-700 font-semibold text-center mb-[10px]">
        {loading ? "Processing" : "Sign Up"}
      </h1>

      <hr className="mb-[10px]" />

      {/* EXACT 10px vertical spacing between ALL blocks */}
      <div className="flex flex-col space-y-[10px]">

        <div className="flex flex-col space-y-10px] text-gray-600">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            id="username"
            type="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
            className="p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
      
        <div className="flex flex-col space-y-10px] text-gray-600">
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

        <div className="flex flex-col space-y-[10px] text-gray-600">
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
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`p-2 bg-blue-600 text-white rounded-md disabled:opacity-50 ${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-blue-700 transition-all duration-200 mt-[10px]`}
        >
          {buttonDisabled ? "Fill all fields" : "Sign Up"}
        </button>

      </div>

      <Link
        href="/login"
        className="block text-center mt-[10px] text-blue-600 hover:underline"
      >
        Already have an account? Login
      </Link> 
    </div>
  </div>
)
}
