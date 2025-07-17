import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Users, Radio, Heart, Mic, Vote, Zap } from "lucide-react"
import Link from "next/link"
import Appbar from "./component/appbar"
import { Redirect } from "./component/redirect"

export default function MusicStreamingLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
         <Appbar />
          <Redirect />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse delay-1000"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-8">
              <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 shadow-lg shadow-cyan-500/25">
                🎵 Fan-Powered Streaming
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none text-white">
                Let Your Fans Choose the{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Beat
                </span>
              </h1>
              <p className="max-w-[600px] text-gray-300 text-lg md:text-xl">
                The first streaming platform where fans vote on what plays next.
                <span className="text-cyan-400 font-semibold"> Democracy meets music.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg shadow-cyan-500/25 text-white border-0"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Start Streaming
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-pink-400/50 text-pink-400 hover:bg-pink-400/10 hover:border-pink-400 bg-transparent"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join as Fan
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>10K+ Live Creators</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-400" />
                  <span>1M+ Active Fans</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-gray-900/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Everyone's <span className="text-cyan-400">Obsessed</span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gray-800/50 border-cyan-500/20 backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/25">
                    <Vote className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Real-Time Voting</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fans control the playlist. Democracy in action.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-500/25">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Instant Engagement</CardTitle>
                  <CardDescription className="text-gray-300">
                    Chat, react, and vibe together in real-time.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gray-800/50 border-pink-500/20 backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-pink-500/25">
                    <Radio className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Crystal Clear Audio</CardTitle>
                  <CardDescription className="text-gray-300">
                    High-quality streaming that sounds amazing.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-6 text-white">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Go <span className="text-yellow-400">Viral</span>?
              </h2>
              <p className="max-w-[600px] text-gray-300 text-lg">Join the music revolution. Start streaming today.</p>
              <div className="w-full max-w-sm">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-cyan-400"
                  />
                  <Button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-lg shadow-yellow-400/25"
                  >
                    Start Free
                  </Button>
                </form>
                <p className="text-xs text-gray-400 mt-2">Free forever. No credit card needed.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 md:px-6 border-t border-gray-800 bg-gray-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© 2024 StreamTune. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="#" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
