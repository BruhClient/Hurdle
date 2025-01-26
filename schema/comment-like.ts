import { z } from "zod";

export const CommentLikeSchema = z.object({
    commentId : z.string() , 
    
})

export type CommentLikePayload = z.infer<typeof CommentLikeSchema>