'use client'

import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { AtSign, Eye, EyeOff, KeyRound, Mail } from "lucide-react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
     const [loading, setLoading] = useState(false)

    const reveal = async () => {
        setShowPassword(!showPassword)
    }

  const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError("Invalid email or password")
    } else {

      redirect("/dashboard")
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full md:max-w-md rounded-lg shadow-lg md:p-8 p-5 bg-[#03081b]">
        <h1 className="text-2xl font-bold mb-4 text-center text-slate-200">Welcome Back</h1>
        {error && <p className="text-red-500 text-center mb-4 text-[14px] font-semibold">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com"
              className="mt-1 block w-full px-3 py-2  bg-transparent border border-slate-700 rounded-md text-sm shadow-sm placeholder-gray-400 text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-[40px]"
                      />
                      <Mail className="absolute bottom-[10px] left-3" size={20} color="#94a3b8" />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="***********"
              className="mt-1 block w-full py-2 bg-transparent border border-slate-700 rounded-md text-sm shadow-sm placeholder-gray-400 text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 px-[40px]"
                      />
                      <KeyRound className="absolute bottom-[10px] left-2" size={20} color="#94a3b8" />
                      {
                          showPassword ?
                          <Eye className="absolute bottom-[10px] right-3 cursor-pointer" size={20} color="#94a3b8" onClick={reveal} />
                          :
                          <EyeOff className="absolute bottom-[10px] right-3 cursor-pointer" size={20} color="#94a3b8" onClick={reveal} />

                }
          </div>
                  <button type="submit" disabled={loading ? true : false} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      {
                          loading ? "Loading..." : " Sign In"
                      }

          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account? <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
