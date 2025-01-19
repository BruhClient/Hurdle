"use client"

import { VerificationForm } from "@/components/auth/verification-form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

 
const NewVerificationPage =  () => {

    

    
    return ( <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Suspense><VerificationForm /></Suspense>
            
        </div> );
}
 
export default NewVerificationPage;