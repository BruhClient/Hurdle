"use client"

import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { FollowUserPayload } from "@/schema/follow-user";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface FollowButtonProps {
    userId : string ,
    isFollowing : boolean
}
 
const FollowButton: FunctionComponent<FollowButtonProps> = ({userId,isFollowing}) => {

    
    const [following,setFollowing] = useState(isFollowing)
    const {toast} = useToast()
    const router = useRouter()
    const {mutate : follow,isPending} = useMutation({
        mutationKey :["follow"], 
        mutationFn : async () => { 
            const payload:FollowUserPayload = {
                userId
            }
           
            const data = await axios.post("/api/user/follow" , payload)
            
            return data
        }, 
        onMutate :() => { 
            setFollowing(!following)
        }, 
        onSuccess :() => { 
            router.refresh()
        },
        onError : () => { 
            setFollowing(!following)
            toast({
                title: "Something went wrong" , 
                description : "Please try again" , 
                variant :"destructive", 
            })
        }
    })

    if (following) { 
        return ( 
            <Button onClick={() => follow()} disabled={isPending}>{isPending ? <ClipLoader size={15} className=' text-card'/>:"Following" }<ChevronDown /></Button>
         );
    } else { 
        return <Button onClick={() => follow()} variant={"outline"} disabled={isPending}>{isPending ? <ClipLoader size={15} className=' text-card'/>:"Follow" }</Button>
    }
    
}
 
export default FollowButton;