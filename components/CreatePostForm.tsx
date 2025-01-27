'use client';

import {
  
    FileState,
    MultiImageDropzone,

  
} from '@/components/ImageUploader';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { Button } from './ui/button';
import TextareaAutosize from 'react-textarea-autosize';
import {useMutation} from "@tanstack/react-query"
import axios from "axios"
import { CreatePostPayload, CreatePostSchema } from '@/schema/create-post';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ClipLoader, FadeLoader } from 'react-spinners';

export default function CreatePostForm() {
    
    const { edgestore } = useEdgeStore();
    const [input,setInput] = useState<string>("")
    
    const router = useRouter()
    const {toast} = useToast()

    const [fileStates, setFileStates] = useState<FileState[]>([]);
  
    const onSubmit =  () => { 
        if (fileStates.length === 0 ) { 
            return toast({ 
                title : "Please select a image" , 
                description :"Post must have at least 1 image" , 
                variant : 'destructive'
            })
        }

        createPost()

       
        
    }

    


    const {mutate : createPost,isPending } = useMutation(
        {
            mutationFn : async () => { 
                const toBeUploadedFiles = fileStates.map((fileStates) => fileStates.file) as File[]
                const imageUrls = []

                let i = 0 

                do { 
                    const file = toBeUploadedFiles[i]

                    const res = await edgestore.myPublicImages.upload({
                        file,
                        options : { 
                            temporary : true
                        },
                        input : { 
                            type : "post"
                        }
                      });

                    imageUrls.push(res.url)
                    
                    i++
                } while (i < toBeUploadedFiles.length)


                
                const payload:CreatePostPayload = { 
                    caption : input, 
                    images : JSON.stringify(imageUrls)
                }
                
                const data = await axios.post("/api/post/create",payload)

                return data
            },
            onError : ( error ) => { 
                
                toast({
                    title : "Something went wrong" , 
                    description : "Please try again later", 
                    variant : "destructive",
                })
                
              
            },
            onSuccess : async ({data}) => {
            
                for (let i = 0; i < data.length; i++) {
                    
                    await edgestore.myPublicImages.confirmUpload({
                        url : data[i]
                    })

                }
                

                toast({
                    title : "Post created !" , 
                    description : "Head to your profile page to see your new post", 
                  
                })

                router.refresh()
                setInput("")
                setFileStates([])

 
            }
        }
    )
    
  


    return (

        
        <div className='flex flex-col gap-2 overflow-hidden'>
        <div className='   overflow-auto py-2'>
            <MultiImageDropzone
            className=''
            value={fileStates}
            dropzoneOptions={{
            maxFiles: 6,
            }}
            onChange={(files) => {
            setFileStates(files);
            }}
            onFilesAdded={async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
            
            }}
        />
        </div>
        

        <TextareaAutosize onChange={(e) => setInput(e.target.value)} className='bg-transparent px-2 py-2 rounded-lg w-full outline-none max-h-24 text-lg' placeholder='Caption'/>
        
        <Button className='w-full flex items-center justify-center' disabled={isPending} onClick={() => onSubmit()}>{isPending ? <>Loading <ClipLoader size={15} className=' text-card'/></>:"Post" }</Button >

        </div>
    );
    }