"use client"

import { MessageCircle } from "lucide-react";
import { FunctionComponent } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { User } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";
import CommentsFeed from "./CommentsFeed";
import { DialogDescription } from "@radix-ui/react-dialog";
import UserAvatar from "./UserAvatar";



interface CommentsButtonProps {
    initialComments : number , 
    postId : string , 
    caption: string, 
    createdAt : Date , 
    author : User, 
    

}
 
const CommentsButton: FunctionComponent<CommentsButtonProps> = ({initialComments,postId,caption,author,createdAt }) => {

  
    return ( <div className="flex gap-2">

        <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2 items-center justify-center">
            <button><MessageCircle /> </button>
            {initialComments}
        </div>
        
      </DialogTrigger>
      <DialogContent >
        <DialogTitle>
            Comments
        </DialogTitle>
        <DialogDescription>
          
        </DialogDescription>
        <div className="flex  gap-3">
          <div className="flex items-center gap-2">
              <UserAvatar image={author.image ?? undefined} className="h-10 w-10"/>
              
              <div  >
                <div>
                  {author.username}
                </div>
                <div className="text-sm opacity-35">
                {formatTimeToNow(createdAt)}
                </div>
              </div>
              
          </div>
          
          <div className="flex-1 break-all">{caption}</div>

        </div>
        <div className="w-full h-1 bg-foreground rounded-xl opacity-25" />
        <CommentsFeed postId={postId }/>
       
        



      </DialogContent>
        </Dialog>
        
        </div> );
}
 
export default CommentsButton;