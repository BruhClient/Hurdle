"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CreatePostForm from "../CreatePostForm";
const UserProfile = ({session} :{session : Session}) => {

    const router = useRouter()
    return (


      
        <DropdownMenu  >
          <DropdownMenuTrigger asChild>
          <Avatar >
          <AvatarImage src={session.user?.image ?? undefined} className="object-cover" alt="@shadcn" />
          <AvatarFallback className="bg-card"><FaUser /></AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mx-3 ">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            

            <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Create Post
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogTitle>Create Post</DialogTitle>
                      <DialogDescription>Add a picture and a caption !</DialogDescription>
                      <CreatePostForm />
                    </DialogContent>
              </Dialog>
                
             
            
              <DropdownMenuItem onClick={() => router.push("/")}>
                Home
                
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
                
              </DropdownMenuItem>
              <DropdownMenuItem>
                
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            
            

            <DropdownMenuItem onClick={() => {
                
                signOut(
                    {
                        redirectTo : "/auth/login"
                    }
                )
            }}>
              Log out
              
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    
     
      );
}
 
export default UserProfile;


