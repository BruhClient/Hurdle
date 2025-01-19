"use client"

import { CardWrapper } from "./card-wrapper";
import { Form,FormControl,FormItem,FormLabel,FormField, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { LoginPayload, LoginSchema } from "@/schema/login";
import { Social } from "./socials";
import { useState, useTransition } from "react";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";
import {  useSearchParams } from "next/navigation";
import { login } from "@/actions/login";

const LoginForm= ({isModal} : {isModal : boolean}) => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const [showTwoFactor,setShowTwoFactor] = useState(false)
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?"Email is already in use" : ""
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending,startTransition] = useTransition()
    
    
    

    const form = useForm<LoginPayload>({ 
        resolver: zodResolver(LoginSchema), 
        defaultValues : { 
            email : "" , 
            password : "" , 
            code : ""
        }
    })

    const onSubmit = (data : LoginPayload) => {
        setSuccess("")
        setError("")
        
        startTransition(() => { 
            login(data,callbackUrl).then((data) => { 
                

                if (data?.success) { 
                    
                    setSuccess(data?.success)
                }
                if (data?.error) { 
                    
                    setError(data?.error)
                }
                
                if (data?.twoFactor) { 
                    setShowTwoFactor(true)
                }
                
                
                
            })
        })

    }
    return ( <div><CardWrapper title="Login" description="Welcome to Huddle Up !" isModal={isModal} >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                {showTwoFactor && <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Code ... " {...field} disabled={isPending} />
                            </FormControl>

                            <FormMessage />
                            </FormItem>
                        )}
                        />}
                {!showTwoFactor && (
                    <>
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
                    </>
                ) }
                
                    {success ? <FormSuccess message={success}/> :""}
                    {error || urlError ? <FormError message={error || urlError} /> : ""}
                    <Button type="submit" disabled={isPending}  >{showTwoFactor ? "Login" : "Send Verification Code"}</Button>
                    
                    
                </form>
            </Form>
            <Button variant={"link"} className="px-0 text-sm opacity-40 hover:opacity-100 ml-1" ><Link href={"/auth/reset"}>Forgot password ?</Link></Button>
            <Social />
            <Button asChild variant={"link"} className=" w-full mt-3">
                <Link href={"/auth/register"} >Don't have an account ?</Link>
            </Button>
         
        </CardWrapper></div> );
}
 
export default LoginForm;