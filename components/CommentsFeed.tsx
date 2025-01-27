import { DEFAULT_COMMENT_REFETCH_LIMIT } from "@/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FunctionComponent, useEffect } from "react";
import Comment from "./Comment";
import { ExtendedComment } from "@/types/comment";
import CommentsInput from "./CommentsInput";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";;
import { useCurrentUser } from "@/hooks/use-current-user";
import { Skeleton } from "./ui/skeleton";

interface CommentsFeedProps {
    postId : string
}
 
const CommentsFeed: FunctionComponent<CommentsFeedProps> = ({postId}) => {
    
   

    const user = useCurrentUser()
    
    
    const {data,hasNextPage,fetchNextPage,isFetching,refetch} = useInfiniteQuery(
            
            {
                queryKey : ["Comments",postId] ,   
                
                queryFn : async ({pageParam}) => {
            
                    const query = `/api/comment/feed?page=${pageParam}&limit=${DEFAULT_COMMENT_REFETCH_LIMIT}&postId=${postId}`
                    const {data} = await axios.get(query)
                
                    
                    return data as ExtendedComment[]
                } , 
                initialPageParam : 0 ,
                
                getNextPageParam : (fetchedPages,pages,pageParam ) => { 
                    
                    if (fetchedPages.length < DEFAULT_COMMENT_REFETCH_LIMIT ) { 
                        return undefined
                    }
        
                    
                    return pageParam + 1 
                },    
            },
          
            
             
        )
        
    

    
    
    
    const comments = data?.pages.flatMap((page) => page) ?? [] 
      


    useEffect(() => { 
        if (comments.length === 0) { 
            fetchNextPage()
        }
        
        return () => { 
            
        }
    },[])

    

    
    return ( <div className="w-full h-64 flex flex-col">

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto py-2 scrollbar">
            {comments.map((comment) => { 
                
                const currentLike = comment.likes.find((like) => like.userId === user?.id ) ? true : false 
       
                return <Comment id={comment.id} key={comment.id } author={comment.author} message={comment.message} createdAt={comment.createdAt} currentLikeAmt={comment.likes.length} currentLike={currentLike}/> 
            })}
            {
                isFetching ? <Skeleton className="w-full h-8"/> : ""
            }

            {!isFetching && hasNextPage ? (<Button variant={"outline"} onClick={() => {
                fetchNextPage()
            }}>View more comments <ChevronDown /></Button>) :""}
            
        </div>
        
            
        <CommentsInput postId={postId} refetch={refetch}/>
            
    
    </div> );
}
 
export default CommentsFeed;