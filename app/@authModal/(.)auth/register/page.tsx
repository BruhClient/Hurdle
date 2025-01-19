export const dynamic = "force-dynamic";

import RegisterForm from "@/components/auth/register-form";
import { auth } from "@/lib/auth";

 
const RegisterModal= async () => {
        const session = await auth()
        if (session) { 
            return null
        }
    return ( <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"><RegisterForm isModal={true}/></div> );
}
 
export default RegisterModal;
