
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { CommentLikeSchema } from "@/schema/comment-like"
import { z } from "zod"


export async function POST(req : Request) { 
    const body = await req.json() 
 

    try { 
        const {commentId} = CommentLikeSchema.parse(body) 

        const user = await getCurrentUser()


        if (!user) { 
            return new Response("Unauthorized", {status : 401})
        }

        const existingLike = await prisma.commentLikes.findFirst({
            where : {
                commentId , 
                userId : user.id
            }
        })

        if (existingLike) { 
            await prisma.commentLikes.delete({ 
                where : {
                    userId_commentId: { 
                        userId : user.id , 
                        commentId
                    }
                }

                
        }) 

        }  else { 
            await prisma.commentLikes.create({ 
                data : { 
                    userId : user.id , 
                    commentId 
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