import Link from "next/link";
import { useToast } from "./use-toast";
import { buttonVariants } from "@/components/ui/button";
import { ToastActionElement,ToastAction } from "@/components/ui/toast";

 
const useCustomToast = () => {
    const {toast} = useToast()
    const loginToast = ( ) => {
        const {} =  toast({
            title : "Login required" , 
            description : "You need to be logged in to do that.", 
            variant : "destructive" , 
            
            
            
        })
    }
    return {loginToast};
}
 
export default useCustomToast;