import { CommentReply, User,Comment, CommentLikes } from "@prisma/client";

export type  ExtendedComment = Comment & { 
    author : User, 
    replies : CommentReply[], 
    likes : CommentLikes[], 


}