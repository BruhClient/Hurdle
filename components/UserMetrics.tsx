import { FunctionComponent } from "react";
import UserFollow from "./UserFollow";
import UserFollowing from "./UserFollowing";
import { Button } from "./ui/button";

interface UserMetricsProps {
    userId : string, 
    initialFollowerAmount :number , 
    initialFollowingAmount : number, 
    initialPostCount : number ,

}
 
const UserMetrics: FunctionComponent<UserMetricsProps> = ({initialFollowerAmount,initialFollowingAmount,initialPostCount,userId}) => {
    return ( <div className="flex gap-2">
       
            <UserFollow followAmount={initialFollowerAmount} userId={userId}/>
   
            <UserFollowing followingAmount={initialFollowingAmount} userId={userId}/>
       
            <Button variant={"link"} className="text-lg" >
                {initialPostCount} Posts
            </Button>
    </div> )

}
 
export default UserMetrics;
