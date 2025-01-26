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
        return <CarouselItem className="p-0" key={url}><img src={url} alt=""  loading='lazy' /></CarouselItem>
      })}
    </CarouselContent>
    <div className="ext-sm text-muted-foreground absolute top-2 right-4">
        {current} of {count}
    </div>
    
  </Carousel>
      
      
   
    
  );
};

export default ImageSwiper