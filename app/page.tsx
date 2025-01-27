import CustomFeed from "@/components/CustomFeed";
import Feed from "@/components/Feed";
import GeneralFeed from "@/components/GeneralFeed";
import { getCurrentUser } from "@/lib/session";



export default async function Home() {

  
  const user = await getCurrentUser()

  return <Feed isLoggedIn={user ? true : false}/>
  
}
