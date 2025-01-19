"use server"

import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { getUserByEmail, getUserById } from "@/lib/users";
import { generateVerificationToken } from "@/lib/verification-token";
import { ProfileSettingsPayload } from "@/schema/profile-settings";

export const settings = async (values : ProfileSettingsPayload) => { 
    

    const session = await getCurrentUser()

    if (!session) { 
        return {
            error : "Unauthorized"
        }
    }

    const dbUser = await getUserById(session.id)


    if (!dbUser) { 
        return { 
            error : "User does not exist"
        }
    }

    if (session.isOauth) { 
        values.isTwoFactorEnabled = undefined
        values.email = undefined
        values.password = undefined 
        values.newPassword = undefined
        
    }


    if (values.email && values.email !== session.email) { 
        const existingUser = await getUserByEmail(values.email)

        if (existingUser && existingUser.id !== session.id) { 
            return {error : "Email is already in use !"}
        }

        const verificationToken = await generateVerificationToken(values.email)

        await sendVerificationEmail(verificationToken.email,verificationToken.token)
        
        
        return {
            success : "Email Verification Sent !"
        }
    }

    if (values.password && values.newPassword && dbUser.password ) { 
        
        const isMatched = await bcrypt.compare(values.password,dbUser.password)
        
        if (!isMatched) { 
            return {
                error : "Incorrect Password "
            }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword,10)

        values.password = hashedPassword
        values.newPassword = undefined


    }

    await prisma.user.update({ 
        where : { 
            id : session.id
        }, 
        data : { 
            ...values
        }
    })
    return { 
        success : "Profile updated !"
    }

    
    


}