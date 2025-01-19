"use client"

import { useEffect, useState } from "react"
import { CardWrapper } from "./card-wrapper"
import {BeatLoader} from "react-spinners"
import { newVerification } from "@/actions/verification-token"
import FormSuccess from "../FormSuccess"
import FormError from "../FormError"
import { Button } from "../ui/button"
import Link from "next/link"
export const VerificationForm = ({token} : {token : string | null}) => { 

    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")
    
    useEffect(
        () => { 
            
            if (success || error) { 
                return 
            }

            if (!token) { 
                setError("Missing Token")
                return 
            }
            
            newVerification(token).then(
                (data) => { 
                    setError(data?.error ?? "") 
                    setSuccess(data?.success ?? "")
                }
            )


        },[]
    )


    return <CardWrapper title ="Verification" description="Verification attempt complete" isModal={false}>
        <div>
            {!token && !success && !error ? <BeatLoader size={80} /> : ""}
            {success ? <FormSuccess message={success}/> :""}
            {error ? <FormError message={error} /> : ""}
            <Button variant={"link"} className="text-card-foreground w-full mt-6"><Link href={"/auth/login"}>Head back to login page</Link></Button>
        </div>
    </CardWrapper>
}