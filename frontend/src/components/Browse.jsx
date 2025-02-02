import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";


const randomJobs = [1,2,3];

const Browse = () => {
    return (
        <div>

            
            <Navbar/>
            <div className="max-w-7xl  gap-5 my-10 mx-auto">

            <h1 className="font-bold text-xl my-10">Search results 3</h1>
            <div className="grid grid-cols-3 gap-4">
        {
            randomJobs.map((item,index) => (
                <Job/>
            ))
        }
        </div>
            </div>
        </div>
    )
}

export default Browse;