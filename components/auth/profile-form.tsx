"use client"


import { settings } from "@/actions/profile-settings";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,

    SelectItem,

    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ProfileSettingsSchema,ProfileSettingsPayload } from "@/schema/profile-settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "../ui/switch";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { UserRole } from "@prisma/client";



const ProfileForm = ({user} : {user : any}) => {
    const {update} = useSession()
    
    const [error,setError] = useState<string>("")
    const [success,setSuccess] = useState<string>("")
    const [isPending,startTransition] = useTransition()

    const form = useForm<ProfileSettingsPayload>({
        
        resolver : zodResolver(ProfileSettingsSchema), 
        defaultValues : { 
            name : user.name || undefined, 
            email : user.email || undefined , 
            password : undefined , 
            newPassword :undefined , 
            role : user.role || undefined, 
            isTwoFactorEnabled : user.twoFactor || undefined


         
            
        }
    })
    
    const onSubmit = (values : ProfileSettingsPayload) => { 
        setError("")
        setSuccess("")
        const filteredData = Object.fromEntries(
            Object.entries(values).filter(([_, value]) => value !== undefined)
          );
        
        startTransition(()=> {
            settings(filteredData as ProfileSettingsPayload ).then((data) => { 
                if (data.error) { 
                    setError(data.error)
                }
                if (data.success) {
                    update() 
                    setSuccess(data.success)
                }
                
                
           
                
                
            }).catch(() => {
                setError("Something went wrong")
            })
        })
        
    }

    
   
    return ( <div className="flex justify-center  mt-5 px-3">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 max-w-[500px] flex flex-col gap-3" >
                <div className="flex flex-col">
                    <FormField
                        control={form.control}
                        name="name"
                        
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input required={false} {...field} placeholder={user?.name ?? ""} disabled={isPending} type="text" />
                            </FormControl>

                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        {!user.isOauth && (
                            <>
                            <FormField
                                control={form.control}
                                name="email"
                                
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={user?.email ?? ""} disabled={isPending} type="text" />
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
                                        <Input defaultValue={""} onChange={(e) => field.onChange(e)} placeholder={"******"} disabled={isPending} type="text" />
                                    </FormControl>

                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="newPassword"
                                
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input onChange={(e) => field.onChange(e)} defaultValue={""} placeholder={"******"} disabled={isPending} type="text" />
                                    </FormControl>

                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </>
                    )}

                        

                        <FormField
                        control={form.control}
                        name="role"
                        
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select
                                    disabled={isPending}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={"select a role"}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.USER}>User</SelectItem>
                                            <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                        </SelectContent>

                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}

                        />

                        {!user.isOauth && (<FormField
                        control={form.control}
                        name="isTwoFactorEnabled"
                        
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-2">
                                <div className="space-y-0.5">
                                    <FormLabel>Two Factor Authentication</FormLabel>
                                    <FormDescription>Enable Two Factor Authentication for your account</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        disabled={isPending}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    >

                                    </Switch>
                                </FormControl>
                            </FormItem>
                        )}
                        />)}
                        

                        

                        
                            
                            
                            
                </div>

                
            
                {error ? <FormError message={error}/> : ""}
                {success ? <FormSuccess message={success}/> : ""}
                <Button type="submit" >Save Changes</Button>
            </form>

            
        
        </Form>
    </div> );
}
 
export default ProfileForm;