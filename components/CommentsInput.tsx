import { FormEvent, FunctionComponent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateCommentPayload } from "@/schema/create-post-comment";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useCustomToast from "@/hooks/usecustomtoast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";

interface CommentsInputProps {
    postId : string, 
    refetch : any
}
 
const CommentsInput: FunctionComponent<CommentsInputProps> = ({postId,refetch}) => {
    const {toast} = useToast()
    const router = useRouter()
    const {loginToast} = useCustomToast()
    const user = useCurrentUser()
    const {mutate : createComment,isPending} = useMutation({ 
        mutationFn : async ({postId,message} : CreateCommentPayload) => { 
            const data = await axios.post("/api/comment/create", {postId,message})

            return data
        }, 
        onError : ( error ) => { 
                
            toast({
                title : "Something went wrong" , 
                description : "Please try again later", 
                variant : "destructive",
            })
            
          
        },
        onSuccess : async ({data}) => {
        

            toast({
                title : "Comment created !" , 
           
              
            })

            setInput("")

            refetch()
            router.refresh()
            

        }
    })
    const [input,setInput] = useState("")
    const onSubmit = (e : FormEvent) => { 
        e.preventDefault()
        if (!user) { 
            return loginToast()
        }
        createComment({postId,message : input})
    }

    
    return ( <form className="flex gap-1" onSubmit={onSubmit}>

        <Input placeholder="Enter your comment" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button variant={"outline"} disabled={input === "" || isPending} > {isPending ? <>Loading <ClipLoader size={15} className=' text-card'/></>:"Post" }</Button>
    </form> );
}
 
export default CommentsInput;