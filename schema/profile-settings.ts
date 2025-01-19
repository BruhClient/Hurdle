import { UserRole } from "@prisma/client";
import { z } from "zod";

export const ProfileSettingsSchema = z.object({ 
    name : z.optional(z.string()), 
    isTwoFactorEnabled : z.optional(z.boolean()),
    role : z.enum([UserRole.ADMIN,UserRole.USER]) , 
    password : z.optional(z.string().min(6)) , 
    newPassword : z.optional(z.string().min(6)) ,
    email : z.optional(z.string().email())
    

}).refine((data) => { 

 
    if (data.password && !data.newPassword) { 
        
        return false 
    }
    if (!data.password && data.newPassword) { 
        return false 
    }
    return true
} , { 
    message : 'Please type in your password' , 
    path : ["newPassword"]
} )


export type ProfileSettingsPayload = z.infer<typeof ProfileSettingsSchema >

