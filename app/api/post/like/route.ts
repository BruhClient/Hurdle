
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { LikeSchema } from "@/schema/like"
import { z } from "zod"


export async function POST(req : Request) { 
    const body = await req.json() 
 
    
    try { 
        const {postId} = LikeSchema.parse(body) 

        const user = await getCurrentUser()

        
        if (!user) { 
            
            return new Response("Unauthorized", {status : 401})
        }

        const existingLike = await prisma.like.findFirst({
            where : {
                postId , 
                userId : user.id
            }
        })

        if (existingLike) { 
            await prisma.like.delete({ 
                where : {
                    userId_postId : { 
                        userId : user.id , 
                        postId
                    }
                }

                
        }) 

        }  else { 
            await prisma.like.create({ 
                data : { 
                    userId : user.id , 
                    postId 
                }
            })
        }

        return new Response("OK")
    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return new Response(error.message,{status : 422})
        }
        return new Response("Could not create a post",{status : 422})
    }
    

    



}