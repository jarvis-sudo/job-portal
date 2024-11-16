import React from "react";
import { Button } from "@/components/ui/button"
import {Bookmark} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"



const Job = () => {
    return (
        <div className="p-5 rounded-lg shadow-xl">
            <div className="flex justify-between items-center">
                <p>2 days ago</p>
                <Button><Bookmark/></Button>

            </div>
            <div className="flex">
            <div>
        <Avatar>
            <AvatarImage ssrc='https://imgs.search.brave.com/bLw7KreVtEkckuCGhWCCAlsde0Y2dR_CO53MvUw3Nag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzEwLzM4LzI5/LzM2MF9GXzExMDM4/Mjk5Ml9FdnlwaVFp/VFNudndSSkVkREc1/ZTNyQlA2S08xb1ho/dC5qcGc' />
        </Avatar>
            </div>
            <div>
                <h1 className="font-bold">Company Name</h1>
                <p>India</p>
            </div>
            </div> 
            <div>
                <h1>Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perferendis amet unde eius nobis!</p>
            </div>
            <div>
                <Badge className='text-blue-700' variant='ghost'>12 positions</Badge>
                <Badge  className='text-[#F83002]' variant='ghost'>Full stack development</Badge>
                <Badge className='text-[#7209B7]' variant = 'ghost'>10 lpa</Badge>

            </div>
            <div className="flex items-center gap-2 mt-4">
                <Button>Details</Button>
                <Button>Save for Later</Button>
            </div>
        </div>
    )
}

export default Job;