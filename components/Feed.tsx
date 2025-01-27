"use client"

import { FunctionComponent, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import GeneralFeed from "./GeneralFeed";
import CustomFeed from "./CustomFeed";

interface FeedProps {
    isLoggedIn : boolean
}
 
const Feed: FunctionComponent<FeedProps> = ({isLoggedIn}) => {
    const [feedType,setFeedType] = useState("General")
    return ( <div>
        <div className="fixed px-2 z-50">
            <Select onValueChange={(value) => setFeedType(value)} defaultValue={feedType}>
            <SelectTrigger className="w-[180px] px-3 ">
                <SelectValue placeholder="General" />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                
                <SelectItem value="General">General</SelectItem>
                {isLoggedIn && <SelectItem value="Friends">Friends</SelectItem> }
                
                </SelectGroup>
            </SelectContent>
            </Select>
        </div>
        
        
        {feedType === "General" ? <GeneralFeed /> : <CustomFeed />}
    </div> );
}
 
export default Feed;