"use client"

import { useEffect, useMemo, useRef } from "react";
import {useIntersection} from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_REFETCH_LIMIT } from "@/config";
import axios from "axios";

import PostDisplay from "./Post";
import { ExtendedPost } from "@/types/post";
import { SkeletonCard } from "./SkeletonCard";
import { Like, Post } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";


const PostFeed = () => {
    const lastPostRef = useRef<HTMLElement>(null)
    const {ref,entry} = useIntersection({ 
        root: lastPostRef.current, 
        threshold : 1
    })

    const user = useCurrentUser()

    const {data,hasNextPage,fetchNextPage,isFetching} = useInfiniteQuery(
        {
            queryKey : ["Infinite Query"] , 
            queryFn : async ({pageParam}) => {
                const query = `/api/post/feed?page=${pageParam}&limit=${DEFAULT_REFETCH_LIMIT}&`
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
        
        if ( hasNextPage && entry?.isIntersecting ) { 
            fetchNextPage()
        }

    },[entry])



    

    const posts = useMemo(() => {
        
        return data?.pages.flatMap((page) => page) ?? [] as ExtendedPost[]
    } ,[data])

  
    
    
    
 
    return ( <div className="flex flex-col gap-3  justify-center mt-3 items-center">
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
    </div> );
}
 
export default PostFeed;