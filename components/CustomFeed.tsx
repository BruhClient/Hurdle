import { FunctionComponent } from "react";
import PostFeed from "./PostFeed";

interface CustomFeedProps {
    
}
 
const CustomFeed: FunctionComponent<CustomFeedProps> = () => {
    return ( <PostFeed q="Custom"/> );
}
 
export default CustomFeed;