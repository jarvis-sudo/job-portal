import React from "react";
import { Button } from "@/components/ui/button"
import {Bookmark} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom";



const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdTime = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdTime;
        return Math.floor(timeDifference/(1000 * 60 * 60 * 24));
    }

    if(!job) {
        return <div>JOb data is not available!</div>
    }
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full"><Bookmark/></Button>

            </div>
            <div className="flex items-center gap-2 my-2">
            <Button className="p-6" variant="outline" size="icon">
        <Avatar>
            <AvatarImage src={job?.company?.logo || "/apple.png"} />
        </Avatar>
            </Button>
            <div>
                <h1 className="font-medium text-lg">{job?.company?.name || "no coompany"}</h1>
                <p className="text-sm text-gray-500">{job?.company?.location}</p>
            </div>
            </div> 
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>
            <div>
                <Badge className='text-blue-700' variant='ghost'>{job?.position}</Badge>
                <Badge  className='text-[#F83002]' variant='ghost'>{job?.jobType}</Badge>
                <Badge className='text-[#7209B7]' variant = 'ghost'>{job?.salary}lpa</Badge>

            </div>
            <div className="flex items-center gap-2 mt-4">
                <Button onClick={() => {
                   // console.log(job);
                    navigate(`/description/${job?._id}`)
                }}>Details</Button>
                <Button className="bg-[#7209b7]">Save for Later</Button>
            </div>
        </div>
    )
}

export default Job;