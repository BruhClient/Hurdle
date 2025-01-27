import UserPost from "@/components/UserPost";
import { prisma } from "@/lib/prisma";
import { Follows, Post, User } from "@prisma/client";
import FollowButton from "@/components/FollowButton";
import UserMetrics from "@/components/UserMetrics";
import { getCurrentUser } from "@/lib/session";
import UserAvatar from "@/components/UserAvatar";

type ExtendedUser = User & { 
    _count : {
        posts : number ,
        followers : number , 
        following:number
     }, 
     followers : Follows[],
     posts : Post[],
    
}


const ProfilePage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const {slug} = await params

    const user = await getCurrentUser()
    
    const dbUser = await prisma.user.findUnique({
        where : { 
            id : slug
        }, 
        select : { 
            _count : { 
                select : {
                    posts : true,
                    followers : true , 
                    following : true ,
                } 
            }, 
            posts : true , 
            id : true , 
            image :true,
            username: true, 
         


        }
    })  as ExtendedUser

    

    
    

    if (!dbUser) { 
        return <div>User not found !</div>
    }
    
    const isFollowing = await prisma.follows.findFirst({
        where : { 
            
            followerId : user?.id, 
            followingId : dbUser.id 
        }
    }) ? true : false

    
    return ( <div className="flex w-full items-center flex-col pointer-events-auto pt-9 gap-3">
        
                <UserAvatar image={dbUser?.image ?? undefined} className="w-44 h-44 "/>
                
                
                    <div className="flex gap-2 items-center">
                        <div className="text-lg">
                            {dbUser.username}
                        </div>
                        {user?.id === slug ? "( Your Profile )": <FollowButton userId={dbUser.id} isFollowing={isFollowing}/> }
                        
                    </div>

                    <UserMetrics initialFollowerAmount={dbUser._count.followers} initialFollowingAmount={dbUser._count.following} initialPostCount={dbUser._count.posts}/>

                    
            
                    <UserPost posts={dbUser?.posts}/>
    </div> );
}
 
export default ProfilePage;