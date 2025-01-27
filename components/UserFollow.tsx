import { FunctionComponent } from "react";
import { Button } from "./ui/button";

interface UserFollowProps {
    userId? : string, 
    followAmount : number

}
 
const UserFollow: FunctionComponent<UserFollowProps> = ({followAmount,userId}) => {

    return ( <Button variant={"link"} className="text-lg">
        {followAmount} followers
    </Button> );
}
 
export default UserFollow;