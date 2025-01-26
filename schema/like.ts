import { z } from "zod";

export const LikeSchema = z.object({
    postId : z.string() , 
})

export type LikePayload = z.infer<typeof LikeSchema>