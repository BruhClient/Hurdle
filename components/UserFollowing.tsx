import { FunctionComponent } from "react";
import { Button } from "./ui/button";

interface UserFollowingProps {
    userId? : string, 
    followingAmount : number

}
 
const UserFollowing: FunctionComponent<UserFollowingProps> = ({followingAmount,userId}) => {

    return ( <Button variant={"link"} className="text-lg">
        {followingAmount} Following
    </Button> );
}
 
export default UserFollowing;