import { prisma } from "./prisma"
import {v4 as uuidv4} from "uuid"

export const getPasswordResetTokenByToken = async (token :string) => { 
    try { 
        const passwordToken = await prisma.passwordResetToken.findUnique({ 
            where : { 
                token 
            }
        }) 
        return passwordToken
    } catch(error ) { 
        return null
    }
}

export const getPasswordResetTokenByEmail = async (email :string) => { 
    try { 
        const passwordToken = await prisma.passwordResetToken.findFirst({ 
            where : { 
                email 
            }
        }) 
        return passwordToken
    } catch(error ) { 
        return null
    }
}

export const generatePasswordResetToken = async (email : string) =>  { 
    const token = uuidv4()

    const expires = new Date(new Date().getTime() + 3600 * 10000)
    const existingToken = await getPasswordResetTokenByEmail(email) 

    if (existingToken) { 
        await prisma.passwordResetToken.delete({
            where :{ 
                id : existingToken.id
            }, 

        } )
    }

    const passwordToken = await prisma.passwordResetToken.create({ 
        data : { 
            email , 
            token , 
            expires
        }
    })

    return passwordToken
    
}