"use client"

  
  import {
    Command,
    CommandEmpty,

    CommandList,

  } from "@/components/ui/command"
import { Input } from "./ui/input"
import {  useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
  
  export function Searchbar() {
    const [input,setInput] = useState<string>("")

    const debounceValue = useDebounce(input)

    
    
    return (
      <Command className=" relative overflow-visible flex-1 bg-transparent flex items-center max-w-[800px]">
        <Input onChange={(e) => {
            setInput(e.target.value)
        }} placeholder="Search for users ..." className="bg-input text-foreground  " />
        <CommandList className={`absolute top-9 w-full bg-input ${debounceValue ? "": "opacity-0" } duration-200 ease-in-out transition-opacity`}>
          <CommandEmpty>No results found.</CommandEmpty>
          
        </CommandList>
      </Command>
    )
  }
  