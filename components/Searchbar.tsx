"use client"

  
  import {
    Command,
    CommandEmpty,

    CommandList,

  } from "@/components/ui/command"
import { Input } from "./ui/input"
import {  useEffect, useMemo, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { User } from "@prisma/client"
import { CommandItem } from "cmdk"
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import { Button } from "./ui/button"
  
  export function Searchbar() {
    const [input,setInput] = useState<string>("")

    const debounceValue = useDebounce(input)

    const {
      refetch , 
      data
    } = useQuery({
      queryFn : async () => { 
        if (!input) return []
        const { data } = await axios.get(`/api/search?q=${input}`)
        return data as User[]
      }, 
      queryKey : ['search-query'], 

    })

    useEffect(() => { 
      refetch()
    },[debounceValue])

    
    const users = useMemo(() => { 
      if (!data) return []
      return data as User[]
    },[data])

    console.log(users)

    
    return (
      <Command className=" relative overflow-visible flex-1 bg-transparent flex items-center max-w-[800px]">
        <Input onChange={(e) => {
            setInput(e.target.value)
        }} placeholder="Search for users ..." className="bg-input text-foreground  " />
        <CommandList className={`absolute top-9 w-full bg-input ${debounceValue ? "": "opacity-0" } duration-200 ease-in-out transition-opacity z-50 px-4 py-2`}>
          <CommandEmpty>No results found.</CommandEmpty>
          {users?.map((user) => {
            return <CommandItem key={user.id} className="flex items-center ">
              <UserAvatar image={user?.image ?? undefined} />
              <Button variant={"link"} className="text-md">
                <Link href={`/user/${user.id}`}>{user.username}</Link>
              </Button>
              
              </CommandItem>
          })}
          
          
        </CommandList>
      </Command>
    )
  }
  