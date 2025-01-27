

import { Searchbar } from "./Searchbar";
import AuthButtons from "./auth/auth-buttons";
import Logo from "./auth/Logo";
import UserProfile from "./auth/user-profile";
import { auth } from "@/lib/auth";


 
const Navbar = async () => {

    const session = await auth()
   
    return ( <div className="flex justify-between items-center px-2 py-2 fixed w-full top-0 z-50 pointer-events-auto bg-background border-input border-b-2">

        <Logo />

        <Searchbar />

        {session ? <UserProfile session={session}/> : <AuthButtons /> }
      
        
    </div> );
}
 
export default Navbar;