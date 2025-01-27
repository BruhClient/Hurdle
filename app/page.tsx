import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import { getCurrentUser } from "@/lib/session";



export default async function Home() {

  
  const user = await getCurrentUser()

  if (user) { 
    return <CustomFeed />
  } else { 
    return <GeneralFeed />
  }
  
}
