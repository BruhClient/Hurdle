"use client"

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
export const Social = () => { 
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const onClick = async (provider : "google" | "github") => { 
        signIn(provider , {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    }

    return <div className="flex gap-2 w-full ">
        <Button variant={"outline"} className="flex-1" onClick={() => onClick("google")}><FcGoogle /> </Button>
        <Button variant={"outline"} className="flex-1" onClick={() => onClick("github")}><FaGithub /> </Button>
    </div>
}