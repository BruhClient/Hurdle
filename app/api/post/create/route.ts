
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { CreatePostSchema } from "@/schema/create-post"
import { z } from "zod"

export async function POST(req : Request) { 
    
    const user = await getCurrentUser()

    
    if (!user) { 
        return new Response("Unauthorized", {status : 401})
    }

    try { 
        
        const body = await req.json()
        const {images,caption} = CreatePostSchema.parse(body)


        
        await prisma.post.create({ 
            data : { 
                images : JSON.parse(images), 
                caption,
                authorId : user.id,
                
            }
        })
        
        return new Response(images)

    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return new Response(error.message,{status : 422})
        }
        return new Response("Could not create a post",{status : 422})
    }
    
   
}