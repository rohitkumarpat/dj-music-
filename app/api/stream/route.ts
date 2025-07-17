import { prismaclient } from "@/app/lib/db";
import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";
import {xid, z} from "zod"

import *as youtubesearchapi from "youtube-search-api";
import { getServerSession } from "next-auth";


var YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const createstream=z.object({
    creatorid:z.string(),
    url:z.string()
})

export async function POST(req:NextRequest,res:NextResponse) {
      try {
       const data=createstream.parse(await req.json());
        
       const isyt=data.url.match(YT_REGEX)

       if(!isyt) {
          return NextResponse.json({
            message:"Wrong url.."
        },{
            status:411
        })
       }
          const session = await getServerSession();
         if (!session?.user?.email) {
         return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
         }

           const submittedBy = session.user.email;

       const extractedid=data.url.split("?v=")[1];
       const details=await youtubesearchapi.GetVideoDetails(extractedid);
        const thumbnails=details.thumbnail.thumbnails;
        thumbnails.sort((a:{width:number},b:{width:number})=>a.width<b.width ? -1 : 1);
       
       const stream=await prismaclient.stream.create({

        data: {
          userid:data.creatorid,
          submittedBy:submittedBy,
           url:data.url,
         extractedid,
         type:"Youtube",
         title:details.title ??"cant find the title..",
         smallimage:(thumbnails.length>1 ? thumbnails[thumbnails.length-2].url : thumbnails[thumbnails.length-1].url) ?? "",
         bigimage:thumbnails[thumbnails.length-1].url ?? ""
       
        }
       })

       return NextResponse.json ({
          message:"Added stream",
           id:stream.userid
        })
        }

      catch(e) {
        return NextResponse.json({
            message:"error while adding the stream.."
        },{
            status:411
        })
      }
}



export async function GET(req:NextRequest) {
      const creatorid=req.nextUrl.searchParams.get("creatorid");
      const stream=await prismaclient.stream.findMany({
        where:{
             userid:creatorid??""
        }
      })

      return NextResponse.json({
        stream
      })
}