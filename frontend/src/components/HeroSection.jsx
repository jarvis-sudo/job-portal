import React from "react";
import { Button } from "@/components/ui/button"


const HeroSection = () => {

    const searchJobHandler = () => {

    }
    return (
<div className="text-center">
    <div className="flex flex-col gap-5 my-10">
        <span className="text-[#F83002]">No.1 Job Hunt Website</span>
        <h1 className="font-bold text-5xl">Search, Apply & <br/>Get Your <span className="text-[#6A38C2]">Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis inventore beatae id nostrum eveniet totam?</p>
        <div className="flex border border-gray-200 w-[40%] items-center rounded-full mx-auto pl-3">
            <input 
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full" 
            
            />
            <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]"></Button>
        </div>

    </div>
</div>
    )
}

export default HeroSection;