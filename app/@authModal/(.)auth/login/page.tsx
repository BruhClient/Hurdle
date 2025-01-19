export const dynamic = "force-dynamic";

import LoginForm from "@/components/auth/login-form";
import { auth } from "@/lib/auth";


 
const LoginModal= async () => {
    const session = await auth()
    if (session) { 
        return null
    }
    return ( <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"><LoginForm isModal={true} /></div> );
}
 
export default LoginModal;
