"use client"

import { FunctionComponent, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { LikePayload } from "@/schema/like";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { usePrevious } from "@mantine/hooks";
import { useCurrentUser } from "@/hooks/use-current-user";
import useCustomToast from "@/hooks/usecustomtoast";

interface LikeButtonProps {
    postId :string ,
    currentLike : boolean, 
    initialLikes : number,

}
 
const LikeButton: FunctionComponent<LikeButtonProps> = ({currentLike,postId,initialLikes}) => {

    const user = useCurrentUser()
    const [isLiked,setIsLiked] = useState<boolean>(currentLike)
    const [likes,setLikes] = useState<number>(initialLikes)
    const prevLikeAmt = usePrevious(likes)
    const {toast} = useToast()
    const {loginToast} = useCustomToast()
    const {mutate : like} = useMutation({
        mutationFn : async ({postId} : LikePayload) => { 
            const payload : LikePayload = { 
                postId
            }

            const data = await axios.post("/api/post/like",payload) 
          
            return data
        } , 
        onMutate : () => { 
            if (isLiked) { 
                setLikes((prev) => prev - 1)
            } else {
                setLikes((prev) => prev + 1)
            }
            setIsLiked(!isLiked)
            
        }, 
        onError : () => { 
            setIsLiked(!isLiked)
            setLikes(prevLikeAmt!)
            
            return toast({ 
                title : "Something went wrong", 
                description : "Please try again"
            })
        }
    })

    const onClick = () => { 
        if (user) { 
            like({postId})
        } else { 
            loginToast()
        }
        
    }
    return ( <div className="flex gap-2">
            <button onClick={onClick}  >
        <Heart className={cn({"text-red-500 fill-red-500" : isLiked === true})} /> 
    </button>
    <div>
        {likes}
    </div>
        </div> );
}
 
export default LikeButton;