import { UserRole } from "@prisma/client"
import { DefaultSession } from "next-auth"

export type  ExtendedUser = DefaultSession["user"] & { 
    role : UserRole, 
    twoFactor : boolean, 
    id : string, 
    isOauth : boolean
}

declare module "next-auth" { 
    interface Session {
        user : ExtendedUser
    }
}