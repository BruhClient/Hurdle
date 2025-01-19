import { prisma } from "./prisma"
import crypto from "crypto"


export const getTwoFactorAuthTokenByToken = async (token : string) =>  { 
    try { 
        const TwoFactorToken = await prisma.twoFactorToken.findUnique( { 
            where : {
                token
            }
        })
        return TwoFactorToken
    } catch { 
        return null
    }

}

export const getTwoFactorAuthTokenByEmail = async (email : string) =>  { 
    try { 
        const TwoFactorToken = await prisma.twoFactorToken.findFirst( { 
            where : {
                email
            }
        })
        return TwoFactorToken
    } catch  { 
        return null
    }
}

export const generateTwoFactorAuthToken = async (email :string ) => { 

    const token = crypto.randomInt(100_000,1_000_000 ).toString()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getTwoFactorAuthTokenByEmail(email)

    if (existingToken) { 
        prisma.twoFactorToken.delete({
            where : { 
                id : existingToken.id
            }, 
            
        })
    }

    const twoFactorToken = await prisma.twoFactorToken.create({ 
        data : { 
            email , 
            token , 
            expires
        }
    })

    return twoFactorToken
}