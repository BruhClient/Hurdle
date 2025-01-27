
import { prisma } from "@/lib/prisma";
import { FunctionComponent } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import ImageSwiper from "./ImageSwiper";
import { Comment, Like, Post, User } from "@prisma/client";
import LikeButton from "./LikeButton";
import { getCurrentUser } from "@/lib/session";
import CommentsButton from "./CommentsButton";
import DeletePostButton from "./DeletePostButton";
import { formatTimeToNow } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import Image from "next/image";
interface PreviewPostProps {
    postId : string , 
     
    
}
 
type ExtendedPreviewPost = Post & { 
    likes : Like[], 
    comments : Comment[], 
    author : User, 
}

const PreviewPost: FunctionComponent<PreviewPostProps> = async ({postId}) => {
    const user = await getCurrentUser()
    const post = await prisma.post.findUnique({ 
        where : { 
            id : postId, 
            
        }, 
        
        include : { 
            likes : true , 
            comments : true ,
            author : true
        }, 
        
    })  as ExtendedPreviewPost

    if (!post) { 
        return <div>Post cant be found</div>
    }

    const images = post.images as string[]
    const currentLike = post.likes.find((like) => like.userId === user?.id) ? true : false
    const currentLikes = post.likes.length
    const initialComments = post.comments.length
    return ( <div>
        <Dialog>
            <DialogTrigger>
                
                    <Image src={images[0]} alt="" width={300} height={300} objectFit={"cover"} />
                
            </DialogTrigger>

            <DialogContent >
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 ">
                    <UserAvatar image={post.author.image ?? undefined}/>


                    <div className="text-lg">
                        {post.author.username}
                    </div>
                    <div className="opacity-35">
                        {formatTimeToNow(post.createdAt)}
                    </div>
                    </div>
                    <ImageSwiper images={images}/>
                    <div>
                        {post.caption}
                    </div>

                    <div className="flex w-full justify-between">
                        <div className="flex gap-3 items-center">
                            <LikeButton postId={post.id} initialLikes={currentLikes} currentLike={currentLike} />
                            <CommentsButton initialComments={initialComments} caption={post.caption ?? ""} createdAt={post.createdAt} postId={post.id} author={post.author}/>
                        </div>

                        {user?.id === post.author.id ? <DeletePostButton postId={post.id}/> : ""}
                        
                    </div>
                    
                </div>
                
                
            </DialogContent>
        </Dialog>
    </div> );
}
 
export default PreviewPost;