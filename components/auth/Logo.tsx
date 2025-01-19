"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

 
const Logo= () => {
    const router = useRouter()
    return ( <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
    <Image src={"/icon.svg"} alt="Image" width={50} height={50}/>
    <div className="text-2xl hidden lg:flex">
        Hurdle
    </div>
</div> );
}
 
export default Logo;