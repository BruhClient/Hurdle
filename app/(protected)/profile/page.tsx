import ProfileForm from "@/components/auth/profile-form";
import PreviewPost from "@/components/PreviewPost";
import UserPost from "@/components/UserPost";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Post } from "@prisma/client";

 
const ProfilePage = async () => {
    const user = await getCurrentUser()

    const dbUser = await prisma.user.findUnique({ 
        where : { 
            id : user!.id
        }, 
        include : { 
            followers : true , 
            following : true, 
            posts : true,
            
            
        
        }
    })


    const posts = dbUser?.posts ?? []
    const followerCount = dbUser?.followers.length
    const follwingCount = dbUser?.following.length
    const postCount = posts.length


    
    return ( 
    <div className="flex justify-center items-center mt-5 px-3 flex-col gap-3 ">
        
        <ProfileForm user={user}/>
       
        
        <div className="max-w-[500px] w-full h-1 bg-foreground rounded-xl opacity-25 my-3" />

        <div className="flex gap-7 text-xl">
            <div>
            {followerCount} followers
            </div>
            <div>
            {follwingCount} followings
            </div>
            <div>
                {postCount} posts
            </div>
            
           
        </div>

        <div className="text-2xl">My Posts</div>
        <UserPost posts={posts} />
    </div> );
}
 
export default ProfilePage;