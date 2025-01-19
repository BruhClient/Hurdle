

import { Searchbar } from "./Searchbar";
import AuthButtons from "./auth/auth-buttons";
import Logo from "./auth/Logo";
import UserProfile from "./auth/user-profile";
import { auth } from "@/lib/auth";


 
const Navbar = async () => {

    const session = await auth()
   
    return ( <div className="flex justify-between py-2 px-4 items-center gap-4 border-b-2 border-input ">

        <Logo />

        <Searchbar />

        {session ? <UserProfile session={session}/> : <AuthButtons /> }
      
        
    </div> );
}
 
export default Navbar;