import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Button } from "@/components/ui/button"

  


const category = [
    "Frontend Developer",
    "Backend Develper",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                   {
                    category.map((cat,index) => (
                        <CarouselItem key={cat} className="md:basis-1/2 lg-basis-1/3">
                            <Button className="rounded-full">{cat}</Button>
                        </CarouselItem>
                    ))
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;