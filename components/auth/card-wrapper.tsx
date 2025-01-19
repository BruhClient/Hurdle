"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"



interface CardWrapperProps {
    title : string , 
    description? : string , 
    children? : React.ReactNode,
    isModal : boolean
}
export function CardWrapper({title,description,children,isModal} : CardWrapperProps) {

  const router = useRouter()

  return (
    <Card className="min-w-[350px] flex flex-col relative pointer-events-auto w-fit">

      {isModal ? <Button className="absolute top-2 right-2" variant={"ghost"} size={"icon"} onClick={() => router.back()}><X /></Button> : ""}
      <CardHeader className="self-center">
        <CardTitle className="flex items-center text-2xl gap-4 text-card-foreground"><Image src={"/icon.svg"} alt="Image" width={50} height={50}/> {title}</CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      
    </Card>
  )
}
