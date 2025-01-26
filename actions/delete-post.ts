"use server"

import { prisma } from "@/lib/prisma"

export const deletePost = async (postId : string) => { 
    
    try { 
     
        const existingPost = await prisma.post.findUnique({
            where : { 
                id : postId
            }
            
        })
        await prisma.post.delete({ 
            where : { 
                id : postId
            }
        })

        return { 
            success : "Post Successfully deleted !", 
            urls : existingPost?.images
        }
    } catch ( error ) { 
     
        
        return { 
            error : error
        }
    }
}   