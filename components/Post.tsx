import { ExtendedPost } from "@/types/post";
import { FunctionComponent } from "react";
import ImageSwiper from "./ImageSwiper";
import CommentsButton from "./CommentsButton";
import { formatTimeToNow } from "@/lib/utils";
import LikeButton from "./LikeButton";
import UsernameTag from "./UsernameTag";
import UserAvatar from "./UserAvatar";

interface PostDisplayProps {
    post : ExtendedPost, 
    currentLike : boolean, 
    initialLikes : number, 
    initialComments : number, 

}
 
const PostDisplay: FunctionComponent<PostDisplayProps> = ({post,currentLike,initialLikes,initialComments}) => {

    
    

    return ( <div className="flex flex-col w-screen md:w-[600px] p-3 lg:w-[700px] gap-2 ">
        <div className="flex items-center gap-3 ">
            <UserAvatar image={post.author.image}/>
            
            <UsernameTag username={post.author.username} userId={post.author.id} className="text-lg"/>
          
        </div>
        
        <ImageSwiper images={post.images}/>
        
        <div className="flex gap-3 items-center">
            <LikeButton postId={post.id} currentLike={currentLike} initialLikes={initialLikes} /> 
            <CommentsButton postId={post.id} initialComments={initialComments} createdAt={post.createdAt} author={post.author} caption={post.caption}/>
        </div>

        <div className="m-0 p-0 flex flex-col">
            <div>
                <UsernameTag username={post.author.username} userId={post.author.id}/> {post.caption}
            </div>
            <div className="opacity-25">
                {formatTimeToNow(post.createdAt)}
            </div>
            
        </div>
        
        
    </div> );
}
 
export default PostDisplay;