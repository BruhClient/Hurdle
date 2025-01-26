import { Post } from "@prisma/client";
import { FunctionComponent, Suspense } from "react";
import PreviewPost from "./PreviewPost";
import { Skeleton } from "./ui/skeleton";

interface UserPostProps {
    posts : Post[]
}
 
const UserPost: FunctionComponent<UserPostProps> = ({posts}) => {

    const sortedPosts = posts.reverse()
    return ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 pb-5 gap-2 max-w-[1000px]">
        {sortedPosts.map(({id}) => {

            return <Suspense key={id} fallback={<Skeleton className="w-full h-9"/>}>
                    <PreviewPost  postId={id} />
                </Suspense>
        })}
    </div> );
}
 
export default UserPost;