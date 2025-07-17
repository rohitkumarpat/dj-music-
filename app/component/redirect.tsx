
"use client"

import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export  function Redirect() {
    const session= useSession();
    const router=useRouter();
      useEffect(()=>{
        if(session.status==="authenticated") {
            router.push("/dashboard");
        }
      },[session])
    return null;
}   