"use client"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageSwiperProps{ 
  images : string[]
}
const ImageSwiper =  ({images} : ImageSwiperProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] =useState(0)
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    
    <Carousel className="w-full" setApi={setApi}>
      <div className='hidden lg:block'>
      <CarouselPrevious />
      <CarouselNext/>
      </div>
      
    <CarouselContent>
    {images.map((url) => { 
        return <CarouselItem className="p-0 flex items-center justify-center" key={url}><Image width={600} height={600} objectFit={"contain"}   src={url} alt="" quality={70} loading='eager' property="true" /></CarouselItem>
      })}
    </CarouselContent>
    <div className="ext-sm text-muted-foreground absolute top-2 right-4">
        {current} of {count}
    </div>
    
  </Carousel>
      
      
   
    
  );
};

export default ImageSwiper