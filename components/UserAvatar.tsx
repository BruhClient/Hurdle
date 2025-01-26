import { FunctionComponent } from "react";
import { Avatar, AvatarFallback,AvatarImage } from "./ui/avatar";
import { FaUser } from "react-icons/fa";

interface UserAvatarProps {
    image : string | undefined,
    className? : string 
}
 
const UserAvatar: FunctionComponent<UserAvatarProps> = ({image,className}) => {
    return ( <Avatar className={className ?? undefined}>
        <AvatarImage src={image} className="object-cover"></AvatarImage>
        <AvatarFallback className="bg-card w-full flex justify-center items-center"><FaUser /></AvatarFallback>
    </Avatar> );
}
 
export default UserAvatar;