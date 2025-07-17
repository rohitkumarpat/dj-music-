"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music } from "lucide-react"
import Link from "next/link"
import { getSession, signIn, signOut, useSession } from "next-auth/react"

export default function Appbar() {
  const session = useSession();

  return (
    <div className="flex items-center justify-between px-6 py-3  text-white">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
          <Music className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          DJ
        </span>
      </Link>

      <nav className="flex items-center gap-4 sm:gap-6">
        <Link
          href="#features"
          className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
        >
          Features
        </Link>
        <Link
          href="#how-it-works"
          className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
        >
          How It Works
        </Link>

        {/* Auth Buttons */}
        {session.data?.user ? (
          <button
            className="m-2 px-4 py-1 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
            onClick={() => signOut()}
          >
            Logout
          </button>
        ) : (
          <button
            className="m-2 px-4 py-1 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
            onClick={() => signIn()}
          >
            Signin
          </button>
        )}
      </nav>
    </div>
  );
}
