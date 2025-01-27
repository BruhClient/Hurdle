import { FunctionComponent } from "react";

interface UserFollowingProps {
    userId : string, 

}
 
const UserFollowing: FunctionComponent<UserFollowingProps> = () => {
    return ( <div>
        User Following
    </div> );
}
 
export default UserFollowing;