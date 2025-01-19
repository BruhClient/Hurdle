import ProfileForm from "@/components/auth/profile-form";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";

 
const ProfilePage = async () => {
    const session = await getCurrentUser()
    return ( <ProfileForm user={session}/> );
}
 
export default ProfilePage;