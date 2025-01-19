import NewPasswordForm from "@/components/auth/new-password-form"
import { Suspense } from "react"

const NewPasswordPage = () => { 
    return <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Suspense> <NewPasswordForm/> </Suspense>
    
    
        </div>
}

export default NewPasswordPage