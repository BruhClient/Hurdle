"use client"

import { CardWrapper } from "./card-wrapper";
import { Form,FormControl,FormItem,FormLabel,FormField, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { RegisterPayload,RegisterSchema } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Social } from "./socials";
import { Suspense, useState, useTransition } from "react";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";
import { register } from "@/actions/register";

const RegisterForm= ({isModal} : {isModal : boolean}) => {
    
    const [error,setError] = useState<string>("")
    const [success,setSuccess] = useState<string>("")
    const [isPending,startTransition] = useTransition()
    const form = useForm<RegisterPayload>({ 
        resolver: zodResolver(RegisterSchema), 
        defaultValues : { 
            email : "" , 
            password : "" , 
            name : ""
        }   
    })


    const onSubmit = (data : RegisterPayload) => {
        setError("")
      
        setSuccess("")
        startTransition(() => {
            register(data).then(
                (data ) => { 
                    setError(data?.error ?? ""), 
                    setSuccess(data?.success ?? "")
                }
            )
        })
        
    }
    return ( <CardWrapper title="Register" description="Welcome to Huddle Up !" isModal={isModal} >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                

                <FormField
                    control={form.control}
                    name="email"
                    
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email Address ..." {...field} disabled={isPending}/>
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Name ..." {...field} disabled={isPending}/>
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Password ..." {...field} type="password" disabled={isPending}/>
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    /> 
                    {success ? <FormSuccess message={success}/> :""}
                    {error ? <FormError message={error} /> :""}
                    <Button type="submit" className="mb-3" disabled={isPending}>Register</Button>
                    
   
                    
                </form>
         
            </Form>

            <Suspense><Social /></Suspense>
            <Button asChild variant={"link"} className="text-card-foreground w-full mt-3">
                <Link href={"/auth/login"} >Already have an account ?</Link>
            </Button>
        </CardWrapper> );
}
 
export default RegisterForm;