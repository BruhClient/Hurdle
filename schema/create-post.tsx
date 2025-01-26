import {z} from "zod"

export const CreatePostSchema = z.object({ 
    images : z.string(), 
    caption : z.optional(z.string())
}
    

)

export type CreatePostPayload = z.infer<typeof CreatePostSchema>