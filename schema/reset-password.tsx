import {z} from "zod"

export const ResetSchema = z.object({ 
    email : z.string().email({message :'Please enter a valid email address'}), 
    
    

})

export const newPasswordSchema = z.object({ 
    password : z.string().min(5,{message :'Password must be a minimum of 5 characters'}), 
    
    

})


export type ResetPayload = z.infer<typeof ResetSchema>
export type newPasswordPayload = z.infer<typeof newPasswordSchema>