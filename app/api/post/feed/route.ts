
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { z } from "zod"

export async function GET(req : Request) { 
    const url = new URL(req.url)
    try { 
        
    

    const {limit , page,q } = z.object({
        limit : z.string(), 
        page : z.string(), 
        q : z.enum(["General","Custom"])
        
    }).parse( { 
       
        limit : url.searchParams.get("limit") , 
        page : url.searchParams.get("page"), 
        q : url.searchParams.get("q")
    } )
    
    if (q === "Custom") { 
        const user = await getCurrentUser()

        if (!user) { 
            return new Response("Unauthorized" , {status : 401})
        }
        const followings = await prisma.follows.findMany({ 
            where : { 
                followerId : user.id
            }, 
            
            select : { 
                followingId : true
            }
        })

        const followedUsersId = followings.map((user) => user.followingId)
        followedUsersId.push(user.id)
        const posts = await prisma.post.findMany({ 
            take : parseInt(limit) , 
            skip : parseInt(page) * parseInt(limit), 
            orderBy : { 
                createdAt : "desc"
            },
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