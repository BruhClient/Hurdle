"use client"

import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
const page= () => {
    const router = useRouter()
    return ( <>
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <RegisterForm isModal={false}/>
        
    </div>
    <Button variant={"ghost"} size={"icon"} className="absolute top-20 left-5" onClick={() => router.back()}><FaChevronLeft /></Button>
    </> );
}
 
export default page;