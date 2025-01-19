"use server"

import { getPasswordResetTokenByToken } from "@/lib/reset-password-token"
import { getUserByEmail } from "@/lib/users"
import { newPasswordPayload, newPasswordSchema } from "@/schema/reset-password"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const newPassword = async (values : newPasswordPayload, token :string | null) => { 
    if (!token) { 
        return {
            error : "Missing Token !"
        }
    }

    const validatedFields = newPasswordSchema.safeParse(values)

    
    if (!validatedFields.success) { 
        return {error : "Invalid Fields"}
    }

    const {password} = validatedFields.data

    const existingToken = await getPasswordResetTokenByToken(token) 

    if (!existingToken) { 
        return {error : "Token does not exist"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()


    if (hasExpired) { 
        return {error : "Token has Expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) { 
        return {
            error : "Email does not exist"
        }
    }

    const hashedPassword = await bcrypt.hash(password,10)
    
            
    await prisma.user.update({ 
        where : { 
            email : existingToken.email
        }, 
        data : { 
            password : hashedPassword
        }
    })

    await prisma.passwordResetToken.delete({ 
        where : { 
            id : existingToken.id
        }
    })

    return {
        success : "Password has been succesfully reseted !"
    }


}