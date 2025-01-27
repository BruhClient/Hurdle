"use client"

import { FunctionComponent, useTransition } from "react";
import { Button } from "./ui/button";
import { deletePost } from "@/actions/delete-post";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { ClipLoader } from "react-spinners";

interface DeletePostButtonProps {
    postId : string,
}
 
const DeletePostButton: FunctionComponent<DeletePostButtonProps> = ({postId}) => {
    const [isPending,startTransition] = useTransition()
    const {toast} = useToast()
    const router = useRouter()
    const {edgestore} = useEdgeStore()
    const onClick = () => { 
        startTransition(
            async () => { 
                
                await deletePost(postId).then(async (data) => { 
                    const urls = data?.urls as string[]
                    if (urls) { 
                        for (let i = 0; i < urls.length; i++) {
                    
                            await edgestore.myPublicImages.delete({
                                url : urls[i]
                            })
        
                        }
                    }
                    
                    
                    if (data.error) { 
                        toast({
                            title: "Something went wrong" , 
                            description : "Please try again" , 
                            variant:"destructive"
                        })
                    }
                    else { 
                        toast({
                            title: "Post successfully deleted" , 
                            
                           
                        })
                        router.refresh()
                    }
                })
            }
        )
    }
    return ( 
    
        <Button onClick={onClick} variant={"destructive"} disabled={isPending}>
        {isPending ? <>Loading <ClipLoader size={15} className=' text-card'/></>:"Delete" }
    </Button>
 
     );
}
 
export default DeletePostButton;