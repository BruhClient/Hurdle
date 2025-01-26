"use client"

import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { FollowUserPayload } from "@/schema/follow-user";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
    userId : string ,
    isFollowing : boolean
}
 
const FollowButton: FunctionComponent<FollowButtonProps> = ({userId,isFollowing}) => {

    
    const [following,setFollowing] = useState(isFollowing)
    const {toast} = useToast()
    const router = useRouter()
    const {mutate : follow} = useMutation({
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
            <Button onClick={() => follow()}>Following<ChevronDown /></Button>
         );
    } else { 
        return <Button onClick={() => follow()} variant={"outline"}>Follow</Button>
    }
    
}
 
export default FollowButton;