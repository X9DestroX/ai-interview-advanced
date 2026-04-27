"use client"
import { useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center"
  style={{ background: "#F3F4F6" }}>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-md w-[380px] h-[440px] px-10 py-10
      flex flex-col gap-4 mt-16">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/logo.jpeg"
            alt="Labdox Logo"
            width={38}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-2xl font-bold text-[#1E293B]">Labdox</h1>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Smart Hiring, Powered by AI
        </p>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-1000 font-medium">
            Email address
          </label>
          <input
            type="email"
            placeholder="name@company.com"
            className="border border-gray-300 rounded-lg px-4
            text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            text-left w-[320px] h-[30px]"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-1000 font-medium">
            Password
          </label>
          <div className="relative w-[320px]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="border border-gray-300 rounded-lg px-4
              text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-left w-[320px] h-[30px] py-2 "
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1"
            >
              <img
                src="/eye-password-show-svgrepo-com.svg"
                alt="show password"
                width={20}
                height={20}
                className={showPassword ? "opacity-100" : "opacity-40"}
              />
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button className="w-[100px] h-[30px] self-center bg-[#3B82F6] text-white 
        py-1 rounded-lg font-semibold hover:bg-blue-600 transition text-sm">
          Login
        </button>

        {/* Forgot Password */}
        <p className="text-center text-sm text-gray-500 cursor-pointer
        hover:text-blue-500">
          Forgot password?
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 w-[340px] self-center">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400 tracking-widest">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button className="w-[145px] h-[40px] self-center border border-gray-400 
        rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 
        transition flex items-center justify-center gap-0.5">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 
            1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88 
            c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 
            5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 
            8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.48A4.8 4.8 0 0 1 
            4.5 7.52V5.45H1.83a8 8 0 0 0 0 7.1z"/>
            <path fill="#EA4335" d="M8.98 3.58c1.32 0 2.5.45 
            3.44 1.35l2.56-2.56A8 8 0 0 0 1.83 5.45L4.5 
            7.52A4.8 4.8 0 0 1 8.98 3.58z"/>
          </svg>
          Login with Google
        </button>

      </div>

      {/* Create Account */}
      <p className="text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <span className="text-blue-500 font-medium cursor-pointer hover:underline">
          Create Account
        </span>
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="w-full h-[50] bg-white flex justify-between px-10 py-4
      text-xs text-gray-600 border-t border-gray-200 mt-16">
        <span>© 2024 Labdox Inc. All rights reserved.</span>
        <div className="flex gap-2">
          <span className="cursor-pointer hover:text-gray-600">Privacy Policy</span>
          <span className="cursor-pointer hover:text-gray-600">Terms of Service</span>
          <span className="cursor-pointer hover:text-gray-600">Help Center</span>
        </div>
      </div>
    </div>
  )
}