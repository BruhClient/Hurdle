import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { LikePayload } from "@/schema/like";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { usePrevious } from "@mantine/hooks";
import { CommentLikePayload } from "@/schema/comment-like";
import { useRouter } from "next/navigation";

interface CommentLikeButtonProps {
    commentId :string ,
    currentCommentLike : boolean, 
    initialLikes : number, 
    setLikes : Dispatch<SetStateAction<number>>, 
 
}
 
const CommentLikeButton: FunctionComponent<CommentLikeButtonProps> = ({initialLikes,currentCommentLike,commentId,setLikes}) => {


    const [isLiked,setIsLiked] = useState<boolean>(currentCommentLike)
    const router = useRouter()
    const {toast} = useToast()
    const prevLikes = usePrevious(initialLikes)
    const {mutate : like} = useMutation({
        mutationFn : async ({commentId} : CommentLikePayload) => { 
            const payload : CommentLikePayload = { 
                commentId
            }

            const data = await axios.post("/api/comment/like",payload) 

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
        onSuccess : () => { 
            router.refresh()
  
        }, 
        onError : (error) => { 
          
            setIsLiked(!isLiked)
            setLikes(prevLikes!)
            return toast({ 
                title : "Something went wrong", 
                description : "Please try again", 
                variant:"destructive"
            })
        }
    })
    return ( <div className="flex gap-2">
            <button onClick={() => like({commentId})}  >
        <Heart size={15} className={cn({"text-red-500 fill-red-500" : isLiked === true})} /> 
    </button>

        </div> );
}
 
export default CommentLikeButton;