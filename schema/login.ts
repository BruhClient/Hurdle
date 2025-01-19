import {z} from "zod"

export const LoginSchema = z.object({ 
    email : z.string().email({message :'Please enter a valid email address'}), 
    password : z.string().min(5,{message : "Passwords must be at least 5 characters long"}), 
    code : z.string().optional()
    

})

export type LoginPayload = z.infer<typeof LoginSchema>