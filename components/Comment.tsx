import { User } from "@prisma/client";
import { FunctionComponent, useState } from "react";
import { formatTimeToNow } from "@/lib/utils";
import CommentLikeButton from "./CommentLikeButton";
import UserAvatar from "./UserAvatar";

interface CommentProps {
    author : User ,
    message : string ,
    createdAt : Date, 
    currentLike : boolean , 
    currentLikeAmt : number ,
    id : string, 
 


}
 
const Comment: FunctionComponent<CommentProps> = ({message,author,createdAt,currentLike,currentLikeAmt,id}) => {

    const [likes,setLikes] = useState(currentLikeAmt)
    return ( <div className="flex text-sm gap-3 min-w-0 px-1">
        <div className="flex gap-2">
            <UserAvatar image={author.image ?? undefined} className="h-8 w-8"/>
            
            <div className="flex flex-col">
                <div>
                    {author.username}
                </div>
                <div className="text-xs opacity-25">
                    {formatTimeToNow(createdAt)}
                </div>
                
            </div>
        </div>


        <div className=" flex-1 whitespace-normal text-wrap break-all">
            {message}
        </div>

        <div className="flex flex-col items-center gap-1">
            <CommentLikeButton initialLikes={currentLikeAmt} currentCommentLike={currentLike} commentId={id} setLikes={setLikes} />
            <div className="text-xs opacity-25">
                    {likes}
                </div>
        </div>
       
    </div> );
}
 
export default Comment;