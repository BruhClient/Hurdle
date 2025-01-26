"use client"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ImageSwiperProps{ 
  images : string[]
}
const ImageSwiper =  ({images} : ImageSwiperProps) => {
  return (
    
    <Carousel className="w-full">
      <CarouselPrevious />
      <CarouselNext/>
    <CarouselContent>
    {images.map((url) => { 
        return <CarouselItem className="p-0" key={url}><img src={url} alt=""  loading='lazy' /></CarouselItem>
      })}
    </CarouselContent>
    
  </Carousel>
      
      
   
    
  );
};

export default ImageSwiper