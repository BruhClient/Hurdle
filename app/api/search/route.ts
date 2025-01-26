import { prisma } from "@/lib/prisma"
import { z } from "zod"

export async function GET(req : Request) {
    const url = new URL(req.url)

    
    try { 
        
        const {q } = z.object({
            q : z.string(), 
            
            
        }).parse( { 
           
            q : url.searchParams.get("q") , 

        } )

        const users = await prisma.user.findMany({
            where : { 
                username : {
                    startsWith : q
                }    
            }, 
            take : 5, 
        })

        return new Response(JSON.stringify(users))
    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return new Response("Invalid request data passed",{status : 422})
        }
        return new Response("Could not search for user ", {status : 500})
    }
    

    
} 