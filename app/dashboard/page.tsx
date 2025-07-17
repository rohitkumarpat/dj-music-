"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import YouTube from 'react-youtube';

import {
  ChevronUp,
  ChevronDown,
  Play,
  Users,
  Clock,
  Plus,
  ExternalLink
} from "lucide-react"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import axios from "axios"
import { string } from "zod"

interface QueueItem {
  id:string
  extractedid: string
  title: string
  smallimage: string
  bigimage?:string
  submittedBy:string
  upvotescount: number
  duration: string
  hvupvoted?: boolean
  userid:string
}
const REFRESH_INTERVAL_MS=10*1000;


export default function SongVotingApp() {
  const session = useSession()
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [previewVideo, setPreviewVideo] = useState<{
    title:string
    extractedid: string
    smallimage: string
    bigimage:string
  } | null>(null)

    async function refreshStreams() {
      const response = await axios.get('/api/stream/my');
      setQueue(response.data.stream);
  }

  useEffect(()=>{
    
     const interval=setInterval(()=>{
         refreshStreams();
     },REFRESH_INTERVAL_MS)

  },[])

   

const [currentlyPlaying, setCurrentlyPlaying] = useState<QueueItem | null>(null);


  const [queue, setQueue] = useState<QueueItem[]>([])

  const extractVideoId = (url: string) => {
    const regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const handleUrlChange = async (url: string) => {
    setYoutubeUrl(url)
    const extractedid= extractVideoId(url)
      
  const details = await axios.post('/api/stream/look', {
        videoId:extractedid, 
})
    
    if (extractedid) {
      setPreviewVideo({
        title:details.data.title,
        extractedid,
        smallimage: `https://img.youtube.com/vi/${extractedid}/mqdefault.jpg`,
        bigimage:`https://img.youtube.com/vi/${extractedid}/maxresdefault.jpg`
      })
    } else {
      setPreviewVideo(null)
    }
  }

     const handleVote = async (itemId: string, voteType: boolean) => {
      setQueue((prevQueue) =>
        prevQueue.map((item) => {
          if (item.id === itemId) {
            let newVotes = item.upvotescount
            let newHasVoted: true | false | null = voteType

            if (item.hvupvoted === voteType) {
              newVotes += voteType === true ? -1 : 1
              newHasVoted = null
            } else if (item. hvupvoted) {
              newVotes += voteType === true ? 2 : -2
            } else {
              newVotes += voteType === true ? 1 : -1
            }

            return { ...item, upvotescount: newVotes, hasVoted: newHasVoted }
          }
          return item
        }).sort((a, b) => b.upvotescount - a.upvotescount)
      )
     await fetch(`/api/stream/${voteType? "upvote" : "downvote"}`,{
          method:'POST',
          body:JSON.stringify({
              streamid:itemId
          })
        })
    }


    const deletesongfromdb= async (id:string)=> {
          await axios.delete(`/api/stream/delete/${id}`)
    }





const handleSongEnd = async () => {
  if (!currentlyPlaying) return;

  await deletesongfromdb(currentlyPlaying.id);
  setQueue((prevQueue) => {
    const rest = prevQueue
      .filter((song) => song.id !== currentlyPlaying.id)
      .sort((a, b) => b.upvotescount - a.upvotescount);

    setCurrentlyPlaying(rest.length > 0 ? rest[0] : null);

    return rest;
  });
};



const handleSubmitSong = async () => {
  if (previewVideo) {
    try {
      const res = await axios.post("/api/stream", {
        url: youtubeUrl,
        //@ts-ignore
        creatorid:session.data?.user?.id
      });

      setYoutubeUrl("");
      setPreviewVideo(null);
    } catch (err) {
      console.error("Error submitting song:", err);
      alert("Failed to submit song. Please try again.");
    }
  }
};

useEffect(() => {
  if (queue.length > 0 && !currentlyPlaying?.extractedid) {
    setCurrentlyPlaying(queue[0]);
  }
}, [queue]);


  const sortedQueue = [...queue].sort((a, b) => b.upvotescount - a.upvotescount)

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Play className="w-6 h-6 text-red-500" />
            <h1 className="text-xl font-bold text-white">Dj Music</h1>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {queue.length} songs
            </span>
            <span className="flex items-center gap-1">
              <ChevronUp className="w-4 h-4 text-green-400" />
              {queue.reduce((sum, item) => sum + Math.max(0, item.upvotescount), 0)} votes
            </span>
            {session.status === "authenticated" && (
              <button
                className="m-2 px-4 py-1 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
  
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Currently Playing */}
        <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-600/20 to-purple-600/20 border-b border-gray-800">
            <CardTitle className="flex items-center gap-2 text-white">
              <Play className="w-5 h-5 text-red-500" />
              Now Playing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video w-full">
  {currentlyPlaying && (
    <div className="w-full h-full">
      <YouTube
        videoId={currentlyPlaying.extractedid}
        className="w-full h-full"
        iframeClassName="w-full h-full"
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            mute:1
          }
        }}
         onError={(e) => {
    alert("This video cannot be played. Try a different song.");
  }}
        onEnd={handleSongEnd}
      />
    </div>
  )}
</div>
            <div className="p-4 bg-gray-900/50">
            {currentlyPlaying &&
            <div>
              <h3 className="font-semibold text-lg mb-2 text-white">{currentlyPlaying.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>
                  Submitted by <span className="text-blue-400">{currentlyPlaying.submittedBy}</span>
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ChevronUp className="w-4 h-4 text-green-400" />
                    <span className="text-white font-medium">{currentlyPlaying.upvotescount}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentlyPlaying.duration}
                  </span>
                </div>
              </div> 
              </div> }
              </div>
            
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Submit New Song */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Plus className="w-5 h-5 text-green-400" />
                Submit a Song
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">YouTube URL</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                  <Button
                    onClick={handleSubmitSong}
                    disabled={!previewVideo}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Add to Queue
                  </Button>
                </div>
              </div>

              {previewVideo && (
                <Card className="border-dashed border-gray-700 bg-gray-800/50">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Image
                        src={previewVideo.smallimage || "/placeholder.svg"}
                        alt="Video thumbnail"
                        width={120}
                        height={68}
                        className="rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-2 text-white">{previewVideo.title}</h4>
                        <Badge variant="secondary" className="text-xs bg-blue-600/20 text-blue-400 border-blue-600/30">
                          Preview
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Queue Stats */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-purple-400" />
                Queue Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{queue.length}</div>
                  <div className="text-sm text-gray-400">Songs in Queue</div>
                </div>
                <div className="text-center p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    {queue.reduce((sum, item) => sum + Math.max(0, item.upvotescount), 0)}
                  </div>
                  <div className="text-sm text-gray-400">Total Votes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Song Queue */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                Up Next ({queue.length} songs)
              </span>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Sorted by votes
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {sortedQueue.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 p-4 hover:bg-gray-800/50 transition-colors">
                    <div className="text-lg font-bold text-gray-500 w-8 text-center">#{index + 1}</div>
                 <Image
               src={item.smallimage}
               alt="Thumbnail"
               width={80}
              height={45}
              className="rounded-md object-cover"
                       />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium line-clamp-1 mb-1 text-white">{item.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>
                          by <span className="text-blue-400">{item.submittedBy}</span>
                        </span>
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={item. hvupvoted === true ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVote(item.id, true)}
                        className={
                          item. hvupvoted === true
                            ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                            : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                        }
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>

                      <span className="font-bold text-lg min-w-[3rem] text-center text-white">{item.upvotescount}</span>

                      <Button
                        variant={item. hvupvoted === false ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVote(item.id, false)}
                        className={
                          item. hvupvoted === false
                            ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
                            : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                        }
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      <a
                        href={`https://www.youtube.com/watch?v=${item.extractedid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  {index < sortedQueue.length - 1 && <Separator className="border-gray-800" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
