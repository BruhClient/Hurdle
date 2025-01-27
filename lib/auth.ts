

import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import authConfig from "@/config/auth.config"
import { getUserByEmail, getUserById } from "./users"
import { getTwoFactorAuthConfimrationByUserId } from "./twofactor-confimration"
import { UserRole } from "@prisma/client"
import { getAccountByUserId } from "./account"
import {nanoid} from "nanoid"

export const { 
    handlers : {GET,POST}, 
    signIn , 
    signOut, 
    auth ,

} = NextAuth({
    pages : {
       
        signIn :"/auth/login"
    }, 
    events :{ 
        async linkAccount ({user}) { 
            await prisma.user.update({ 
                where : { 
                    id : user.id
                } , 
                data : { 
                    emailVerified : new Date()
                }
            })
        } 
    } , 
    callbacks : {
        async signIn({user,account}) { 
            if (account?.provider !== "credentials") return true 

            
            const existingUser = await getUserById(user.id!)

     
            
            
            if (!existingUser?.emailVerified) { 
                return false 
            } 

            if (existingUser.isTwoFactorEnabled) { 
                const twoFactorConfirmation = await getTwoFactorAuthConfimrationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false 

                await prisma.twoFactorConfirmation.delete({     
                    where : { 
                        id : twoFactorConfirmation.id
                    }
                })

            }
          
            return true 
        }, 
        async jwt({token}) { 
          
            if (!token) { 
                return token
            }
           

            const existingUser = await getUserByEmail(token.email ?? "") 
            
            
            if (!existingUser) { 
                return token
            }

            

            
            const existingAccount = await getAccountByUserId(existingUser.id) 

            // For Oauth with missing username in User model
            if (existingAccount) { 
                if (!existingUser.username) { 
                    await prisma.user.update({ 
                        where : { 
                            id : existingUser.id
                        } , 
                        data : { 
                            username : nanoid(10)
                        }
                    })
                }
            }
            return { 
                email : existingUser.email, 
                username : existingUser.username , 
                picture : existingUser.image, 
                id : existingUser.id, 
                twoFactor : existingUser.isTwoFactorEnabled, 
                role : existingUser.role, 
                isOauth : !!existingAccount
                
            }
            
            
            
            
        },

        async session({token,session}) { 
           
            if (token) {    
                session.user.twoFactor = token.twoFactor as boolean
                session.user.id = token.id as string
                session.user.role = token.role as UserRole
                session.user.email = token.email as string
                session.user.username = token.username as string 
                session.user.image  = token.picture as string | undefined
                session.user.isOauth = token.isOauth as boolean
                 
                

            }

            

           
            return session
        }
    } , 

    adapter : PrismaAdapter(prisma), 
    session : {strategy : "jwt"}, 
    ...authConfig

})