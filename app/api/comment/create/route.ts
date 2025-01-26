import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { CreateCommentSchema } from "@/schema/create-post-comment"
import { z } from "zod"

export async function POST(req : Request) { 
    const body = await req.json()

    try { 
        const {postId,message} = CreateCommentSchema.parse(body)
        const user = await getCurrentUser()
        
            
        if (!user) { 
                return new Response("Unauthorized", {status : 401})
            }

        await prisma.comment.create({
            data : {
                postId , 
                message,  
                authorId : user.id
            }
        })

        return new Response("OK")

    } catch (error) { 
        if (error instanceof z.ZodError) { 
            return new Response("Create Comment payload invalid" , {status : 422})
        }
        return new Response("Something went wrong" , {status : 422})
    }
}