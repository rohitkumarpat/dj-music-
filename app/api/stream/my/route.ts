import { prismaclient } from "@/app/lib/db";
import NextAuth, { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export  async function GET (req:NextRequest){
    const session=await getServerSession();

       const user=await prismaclient.user.findFirst({
              where:{
                  email:session?.user?.email ?? ""
              }
          })
      
          if(!user) {
             return NextResponse.json({ msg: "unauthenticated.." }, { status: 411 });
          }
         
           const stream=await prismaclient.stream.findMany({
        where:{
             userid:user.id
        },
        include :{
          _count:{
            select:{
              upvotes:true
            }
          } ,
          upvotes:{
            where:{
              userid:user.id
            }
          }
        }
      })

      return NextResponse.json({
        stream:  stream.map(({_count , ...rest})=>({
          ...rest,
          upvotescount:_count.upvotes,
          hvupvoted:rest.upvotes.length ? true : false
        }))
      })


}