import ProfileForm from "@/components/auth/profile-form";
import { getCurrentUser } from "@/lib/session";

 
const ProfilePage = async () => {
    const session = await getCurrentUser()
    return ( <ProfileForm user={session}/> );
}
 
export default ProfilePage;