import { NextRequest, NextResponse } from "next/server";
import *as youtubesearchapi from "youtube-search-api";


export  async function POST(req:NextRequest) {
   const body=await req.json();
   const videoId=body.videoId
   try {
       const details=await youtubesearchapi.GetVideoDetails(videoId);
       return NextResponse.json({
          ...details
       },{
        status:200
       })
   }
   catch(e) {
        return NextResponse.json({ success: false, e: "Failed to fetch details" }, { status: 500 })
   }
}