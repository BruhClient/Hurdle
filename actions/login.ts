"use server"

import { getUserByEmail } from "@/lib/users"
import { LoginPayload, LoginSchema } from "@/schema/login"
import { generateVerificationToken } from "@/lib/verification-token"
import { signIn } from "@/lib/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { sendTwoFactorAuthEmail, sendVerificationEmail } from "@/lib/mail"
import { AuthError } from "next-auth"
import { generateTwoFactorAuthToken, getTwoFactorAuthTokenByEmail } from "@/lib/twofactor-auth-token"
import { prisma } from "@/lib/prisma"
import { getTwoFactorAuthConfimrationByUserId } from "@/lib/twofactor-confimration"
import { revalidatePath } from "next/cache"
export const login = async (data : LoginPayload , callbackUrl : string | null ) => {
    
    const validatedFields = LoginSchema.safeParse(data)

    if (!validatedFields.success){ 
        return {
            error : "Invalid Login Request"
        }
    }

    const {email,password , code} = validatedFields.data
    const existingUser = await getUserByEmail(email) 
    if (!existingUser) { 
            return {
                error : "Email is not linked to any account"
            }
        }

    if (!existingUser.emailVerified) { 
            const verificationToken = await generateVerificationToken(email)
            await sendVerificationEmail(verificationToken.email,verificationToken.token)
            return {success : "Confirmation Email sent"}
        }

    if (existingUser.isTwoFactorEnabled && existingUser.email) { 

        if (code) { 
            const twoFactorToken  = await getTwoFactorAuthTokenByEmail(existingUser.email)
  

            if (!twoFactorToken) { 
                return {
                    error : "Token does not exists !"
                }
            }
            if (twoFactorToken.token !== code ) { 
                return {
                    error : "Invalid Code !"
                }
            } 
            const hasExpired = new Date(twoFactorToken.token) < new Date()

            if (hasExpired) { 
                return { 
                    error : "Token has expired"
                }
            }
            
            await prisma.twoFactorToken.delete({ 
                where : { 
                    id : twoFactorToken.id
                }
            })

            const existingTwoFactorConfirmation = await getTwoFactorAuthConfimrationByUserId(existingUser.id)

            if (existingTwoFactorConfirmation) { 
                await prisma.twoFactorConfirmation.delete({ 
                    where : { 
                        id : existingTwoFactorConfirmation.id
                    }
                })
            }
            await prisma.twoFactorConfirmation.create({ 
                data : { 
                    userId : existingUser.id
                }
            })


        } else  { 
            const twoFactorToken = await generateTwoFactorAuthToken(existingUser.email)
            await sendTwoFactorAuthEmail(twoFactorToken.email,twoFactorToken.token)

            return {
                twoFactor : true
        }
        }
        
    }
    
    try { 

      
        
        
        await signIn("credentials" , { 
            email , 
            password,
            redirect:false

        })

        
      
        

        

        

        
        return { 
            success : "Successfully logged in"
        }




        
    } catch(error) { 
        if (error instanceof AuthError) { 
            switch (error.type) { 
                case "CredentialsSignin" : 
                    return {error : "Invalid Credentials"}
                default : 
                    return { 
                        error : "Something went wrong"
                    }
            }
            
        }
        throw error
    }
}