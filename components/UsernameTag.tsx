"use client"

import { FunctionComponent } from "react";
import Link from "next/link";

interface UsernameTagProps {
    userId : string , 
    username : string ,
    className? : string , 
}
 
const UsernameTag: FunctionComponent<UsernameTagProps> = ({userId,username,className}) => {
    return ( 
        
            <Link href={`/user/${userId}`} className={className} >
                {username}
            </Link>
        
     );
}
 
export default UsernameTag;