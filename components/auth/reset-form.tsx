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
import { ResetPayload, ResetSchema } from "@/schema/reset-password";
import { reset } from "@/actions/reset";
import { ClipLoader } from "react-spinners";

const ResetForm= () => {
   
   
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending,startTransition] = useTransition()
  
    
    

    const form = useForm<ResetPayload>({ 
        resolver: zodResolver(ResetSchema), 
        defaultValues : { 
            email : "" , 
          
        }
    })

    const onSubmit = (data : ResetPayload) => {
        setSuccess("")
        setError("")
        
        startTransition(() => { 
            reset(data).then((data) => { 
                setError(data?.error)
                setSuccess(data?.success)
            })
        })

    }
    return ( <div><CardWrapper title="Reset Password" description="Verify via email address" isModal={false} >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email Address ..." {...field} disabled={isPending} />
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    {success ? <FormSuccess message={success}/> :""}
                    {error ? <FormError message={error} /> : ""}
                    <Button type="submit" disabled={isPending}  >{isPending ? <ClipLoader size={15} className=' text-card'/>:"Send Reset Email" }</Button>
                    
                    
                </form>
            </Form>
            
          
            <Button asChild variant={"link"} className=" w-full mt-3">
                <Link href={"/auth/login"} >Back to login</Link>
            </Button>
         
        </CardWrapper></div> );
}
 
export default ResetForm;