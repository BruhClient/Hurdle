
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export async function GET(req : Request) { 
    const url = new URL(req.url)
    try { 
        
        

    const {limit , page,postId } = z.object({
        limit : z.string(), 
        page : z.string(), 
        postId : z.string()
        
    }).parse( { 
        postId : url.searchParams.get("postId") ,
        limit : url.searchParams.get("limit") , 
        page : url.searchParams.get("page")
    } )

    

    const comments = await prisma.comment.findMany({ 
            take : parseInt(limit) , 
            skip : parseInt(page) * parseInt(limit), 
            where : { 
                postId : postId
            }, 
            orderBy : { 
                createdAt : "desc"
            }, 
            include :  { 
                author : true , 
                replies : true , 
                likes : true , 
                
            }

        })
        
        return new Response(JSON.stringify(comments))
    

    

    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return new Response("Invalid request data passed",{status : 422})
        }
        return new Response("Could not fetch more posts ", {status : 422})
    }
}