import ProfileForm from "@/components/auth/profile-form";
import UserFollow from "@/components/UserFollow";
import UserFollowing from "@/components/UserFollowing";
import UserMetrics from "@/components/UserMetrics";
import UserPost from "@/components/UserPost";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

 
const ProfilePage = async () => {
    const user = await getCurrentUser()

    const dbUser = await prisma.user.findUnique({ 
        where : { 
            id : user!.id
        }, 
        
        select :{
            _count :  {
                select :  { 
                    followers : true , 
                    following : true , 
                    posts : true,
                }
            }, 
            followers : true , 
            following : true , 
            posts : true
        }
    })

    if (!dbUser) { 
        return <div className="px-2 text-lg">Could not find User</div>
    }

    const posts = dbUser?.posts ?? []
    const followerCount = dbUser?._count.followers
    const followingCount = dbUser?._count.following
    const postCount = dbUser?._count.posts


    
    return ( 
    <div className="flex justify-center items-center mt-5 px-3 flex-col gap-3 ">
        
        <ProfileForm user={user}/>
       
        
        <div className="max-w-[500px] w-full h-1 bg-foreground rounded-xl opacity-25 my-3" />

        <UserMetrics initialFollowerAmount={followerCount} initialPostCount={postCount} initialFollowingAmount={followingCount} userId={user!.id}/>

        <div className="text-2xl">My Posts</div>
        <UserPost posts={posts} />
    </div> );
}
 
export default ProfilePage;