"use client"

import { useEffect, useMemo, useRef } from "react";
import {useIntersection} from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_REFETCH_LIMIT } from "@/config";
import axios from "axios";
import { FaRegFaceMeh } from "react-icons/fa6";
import PostDisplay from "./Post";
import { ExtendedPost } from "@/types/post";
import { SkeletonCard } from "./SkeletonCard";
import { Like } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";



type PostFeedProps =  { 
    q : "General" | "Custom"
}

const PostFeed = ({q} : PostFeedProps) => {
    const lastPostRef = useRef<HTMLElement>(null)
    const {ref,entry} = useIntersection({ 
        root: lastPostRef.current, 
        threshold : 0.5
    })

    const user = useCurrentUser()
    

    const {data,hasNextPage,fetchNextPage,isFetching,refetch} = useInfiniteQuery(
        {
            queryKey : ["Infinite Query",q] , 
            queryFn : async ({pageParam}) => {
                const query = `/api/post/feed?page=${pageParam}&limit=${DEFAULT_REFETCH_LIMIT}&q=${q}`
                const {data} = await axios.get(query)
                
                return data as ExtendedPost[]
            } , 
            initialPageParam : 0 , 
            getNextPageParam : (lastPage, allPages, lastPageParam ) => { 
                if (lastPage.length < DEFAULT_REFETCH_LIMIT ) { 
                    return undefined
                }
                return lastPageParam + 1
            },    
        }
    )

    

    

    useEffect(() => { 
        console.log("IS INTERSECTING  ?",entry?.isIntersecting)
        console.log("HAS NEXT PAGE",hasNextPage)
        if ( hasNextPage && entry?.isIntersecting ) { 
            console.log("fetchNextPage")
            fetchNextPage()
        }

    },[entry])



    

    const posts = useMemo(() => {
        
        return data?.pages.flatMap((page) => page) ?? [] as ExtendedPost[]
    } ,[data])

  
    
    
    return ( <div className="flex flex-col gap-3  justify-center items-center">
        {posts?.map((post,index) => {
            
            const currentLike = post.likes.find((like : Like) => user?.id === like.userId ) ? true : false 
            
            if (index === posts.length-1) { 
                return <div key={post.id} ref={ref}>
                    <PostDisplay  post={post}  currentLike={currentLike} initialLikes={post.likes.length} initialComments={post.comments.length}/>
                </div>
                
            }
            return <PostDisplay key={post.id} post={post} currentLike={currentLike} initialLikes={post.likes.length} initialComments={post.comments.length}/>}
    )}

    {isFetching ?  <SkeletonCard /> : ""}
    {!hasNextPage && !isFetching && <div className="text-lg flex gap-2 items-center"><FaRegFaceMeh />No more pages</div>}
    </div> );
}
 
export default PostFeed;