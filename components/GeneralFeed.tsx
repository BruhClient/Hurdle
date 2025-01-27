import { FunctionComponent } from "react";
import PostFeed from "./PostFeed";

interface GeneralFeedProps {
    
}
 
const GeneralFeed: FunctionComponent<GeneralFeedProps> = () => {
    return ( <PostFeed q="General"/>  );
}
 
export default GeneralFeed;