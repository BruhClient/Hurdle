import { prisma } from "./prisma"



export const getTwoFactorAuthConfimrationByUserId = async (userId : string) =>  { 
    try { 
        const TwoFactorToken = await prisma.twoFactorConfirmation.findUnique( { 
            where : {
                userId
            }
        })
        return TwoFactorToken
    } catch (error) { 
        return null
    }

}

