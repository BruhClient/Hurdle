import { z } from "zod";

export const FollowUserSchema = z.object({
    userId : z.string() , 
    
})

export type FollowUserPayload = z.infer<typeof FollowUserSchema>