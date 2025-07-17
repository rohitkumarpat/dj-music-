import { prismaclient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest , {params }: { params: { id: string } }) {
    console.log("Deleting stream with ID:", params.id);
       try{
          await prismaclient.stream.delete({
            where:{
                id:params.id
            }
          })
        return NextResponse.json({ success: true });
       }

       catch (error: any) {
  console.error("❌ Full error from Prisma:", error);
  return NextResponse.json({ error: error.message }, { status: 500 });
       }
}