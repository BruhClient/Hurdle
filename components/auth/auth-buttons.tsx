"use client"

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

 
const AuthButtons = () => {
    const router = useRouter()
    return ( <div>
        <div className="hidden gap-2 lg:flex">
            <Button variant={"outline"} onClick={() => router.push("/auth/register")}>Get Started</Button>
            <Button variant={"secondary"} onClick={() => router.push("/auth/login")}>Login</Button>
        </div>
        
        {/*  Mobile Buttons  */}
        <div className="fixed flex gap-2 bottom-3 right-3 lg:hidden">
            <Button variant={"outline"} onClick={() => router.push("/auth/register")}>Get Started</Button>
            <Button variant={"secondary"} onClick={() => router.push("/auth/login")}>Login</Button>
        </div>
    </div> );
}
 
export default AuthButtons;