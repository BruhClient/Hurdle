"use client"

import { VerificationForm } from "@/components/auth/verification-form";
import { useSearchParams } from "next/navigation";

 
const NewVerificationPage =  () => {

    const searchParams = useSearchParams() 

    const token = searchParams.get("token") 

    
    return ( <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <VerificationForm token={token}/>
        </div> );
}
 
export default NewVerificationPage;