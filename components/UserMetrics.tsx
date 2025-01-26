import { FunctionComponent } from "react";

interface UserMetricsProps {
    initialFollowerAmount :number , 
    initialFollowingAmount : number, 
    initialPostCount : number ,

}
 
const UserMetrics: FunctionComponent<UserMetricsProps> = ({initialFollowerAmount,initialFollowingAmount,initialPostCount}) => {
    return ( <div className="flex gap-2 text-lg">
        <div>
            {initialFollowerAmount} followers
        </div>
        <div>
            {initialFollowingAmount} following
        </div>
        <div>
            {initialPostCount} posts
        </div>
    </div> )

}
 
export default UserMetrics;
