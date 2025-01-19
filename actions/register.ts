"use server"

import { sendVerificationEmail } from "@/lib/mail"
import { prisma } from "@/lib/prisma"
import { getUserByEmail } from "@/lib/users"
import { generateVerificationToken } from "@/lib/verification-token"
import { RegisterPayload, RegisterSchema } from "@/schema/register"
import bcrypt from "bcryptjs"

export const register  = async (data : RegisterPayload) => { 
     const validatedFields = RegisterSchema.safeParse(data)


     if (!validatedFields.success) { 
        return {error : "Invalid Regiser Request"}
     }

     const {email,password,name} = validatedFields.data
     try { 
        const existingUser = await getUserByEmail(email) 
    
        if (!existingUser) { 

            const hashedPassword = await bcrypt.hash(password,10)

            
            await prisma.user.create({
                data : {
                    email , 
                    password : hashedPassword, 
                    name , 
                    
                    


                }
            })
            
            const verifcationToken = await generateVerificationToken(email)
            await sendVerificationEmail(verifcationToken.email,verifcationToken.token)
            return {
                success : "Verification Email has been sent !"
            }
            
        } 
        return { error : "Email is already in use"}

     } catch(error ) { 
  
        return {
            error : 'Something went wrong  '
        }
     }
     

}