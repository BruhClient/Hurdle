"use client"

import { CardWrapper } from "./card-wrapper";
import { Form,FormControl,FormItem,FormLabel,FormField, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useTransition } from "react";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";
import { newPasswordPayload, newPasswordSchema } from "@/schema/reset-password";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm= () => {
   
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending,startTransition] = useTransition()
  
    
    



    const form = useForm<newPasswordPayload>({ 
        resolver: zodResolver(newPasswordSchema), 
        defaultValues : { 
            password : "" , 
          
        }
    })

    const onSubmit = (data : newPasswordPayload) => {
        setSuccess("")
        setError("")
        
        startTransition(() => { 
            newPassword(data,token).then(
                (data) => { 
                    
                    setError(data?.error)
                    setSuccess(data?.success)
                }
            )
        })

    }
    return ( <CardWrapper title="Reset Password" description="Enter your new password" isModal={false} >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Password ..." {...field} disabled={isPending} type="password" />
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    {success ? <FormSuccess message={success}/> :""}
                    {error ? <FormError message={error} /> : ""}
                    <Button type="submit" disabled={isPending}  >Reset Password</Button>
                    
                    
                </form>
            </Form>
            
          
            <Button asChild variant={"link"} className=" w-full mt-3">
                <Link href={"/auth/login"} >Back to login</Link>
            </Button>
         
        </CardWrapper> );
}
 
export default NewPasswordForm;