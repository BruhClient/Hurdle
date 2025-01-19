import {z} from "zod"

export const RegisterSchema = z.object({ 
    email : z.string().email({message :'Please enter a valid email address'}), 
    password : z.string().min(5,{message : "Passwords must be at least 5 characters long"}), 
    username : z.string().min(1,{message : "Name is Required"})

})

export type RegisterPayload = z.infer<typeof RegisterSchema>