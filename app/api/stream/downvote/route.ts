import { prismaclient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import {email, z} from "zod";

const upvoteschema=z.object({
    streamid:z.string()
})

export async function POST(req:NextRequest,res:NextResponse) {
    const session= await getServerSession();

    const user=await prismaclient.user.findFirst({
        where:{
            email:session?.user?.email ?? ""
        }
    })

    if(!user) {
       return NextResponse.json({ msg: "unauthenticated.." }, { status: 411 });
    }

    try {
         const data=upvoteschema.parse(await req.json())
        await prismaclient.upvote.delete({
            where:{
                userid_streamid:{
                  streamid:data.streamid,
                userid:user.id
                }
               
            }
        })

        return NextResponse.json({
            msg:"done",
        })
    }catch(e) {
         return NextResponse.json({ msg: "Error while downvoting" }, { status: 411 });
    }
  
}