import { DEFAULT_REFETCH_LIMIT } from "@/config"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { z } from "zod"

export async function GET(req : Request) { 
    const url = new URL(req.url)
    try { 
        const user = await getCurrentUser()
    

    const {limit , page } = z.object({
        limit : z.string(), 
        page : z.string(), 
        
    }).parse( { 
       
        limit : url.searchParams.get("limit") , 
        page : url.searchParams.get("page")
    } )
    
    if (user) { 
        const followings = await prisma.follows.findMany({ 
            where : { 
                followingId : user.id
            }, 
            include : { 
                follower : true
            }
        })

        const followedUsersId = followings.map((user) => user.follower.id)
        let posts = await prisma.post.findMany({ 
            take : parseInt(limit) , 
            skip : parseInt(page) * parseInt(limit), 
            
            where : { 
                authorId : { 
                    in : followedUsersId
                }
            }, 
            
            include :  { 
                author : true , 
                comments : true , 
                likes : true , 
                
            }
        })

        if (posts.length === 0 )  { 
            posts = await prisma.post.findMany({ 
                take : parseInt(limit) , 
                skip : parseInt(page) * parseInt(limit), 
                orderBy : { 
                    createdAt : "desc"
                }, 
                include :  { 
                    author : true , 
                    comments : true , 
                    likes : true , 
                    
                }
    
            })  
        }
        return new Response(JSON.stringify(posts))


    } else { 
        const posts = await prisma.post.findMany({ 
            take : parseInt(limit) , 
            skip : parseInt(page) * parseInt(limit), 
            orderBy : { 
                createdAt : "desc"
            }, 
            include :  { 
                author : true , 
                comments : true , 
                likes : true , 
                
            }

        })
        return new Response(JSON.stringify(posts))
    }

    

    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return new Response("Invalid request data passed",{status : 422})
        }
        return new Response("Could not fetch more posts ", {status : 500})
    }
}