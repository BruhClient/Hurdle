import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { FollowUserSchema } from "@/schema/follow-user"
import { z } from "zod"


export async function POST(req : Request) { 
    
    const body = await req.json()

    try { 

        const user = await getCurrentUser()

        if (!user) { 
                return new Response("Unauthorized" , {status : 401})
            }
        const {userId} = FollowUserSchema.parse(body)
        
        const isFollowing = await prisma.follows.findFirst({
            where : { 
                followerId : user.id, 
                followingId : userId
            }
        })

        if (isFollowing) { 
            await prisma.follows.delete({
                where : { 
                    followerId_followingId : { 
                        followerId : user.id, 
                        followingId : userId
                    }
                    
                }
            })
            
        } else { 
            
            await prisma.follows.create({ 
                data : { 
                    followerId : user.id, 
                    followingId : userId
                }
            })

            
        }
        return new Response("OK")


    } catch(error) { 
        
        if (error instanceof z.ZodError) { 
            return new Response(error.message,{status : 422})
            }
        return new Response("Could follow user",{status : 422})
    }
    
    
}