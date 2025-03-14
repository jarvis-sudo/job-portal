import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {Pen,Mail,Contact, Badge} from "lucide-react"
import AppliedJobTable from "./AppliedJobTable.jsx";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import { useSelector } from "react-redux";
import { Label } from "@radix-ui/react-label";
//import { setUser } from "@/redux/authslice"


const isResume = true;

const Profile = () => {
    
    const [open,setOpen] = useState(false);
    const {user} = useSelector(store => store.auth);

    console.log("Current user:" ,user)
    return (
        <div>
            <Navbar/>
            <div className="max-w-7xl border border-gray-200 mx-auto rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="https://imgs.search.brave.com/DTdpdeF4FZVuhhapWGP_yXWN2MqzfZ_IirzayJUqPkk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/MDQzMjU0Ni92ZWN0/b3IvaGV4YWdvbi1s/b2dvLXNpZ24uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUVk/VWMtNllCS255RHp1/RFItT1dBc2h1VWlz/dFFpc0tFSEI1Vmsx/RlAyRmc9"/>
                    </Avatar>
                
                <div>
                    <h1 className="font-medium text-xl">{user?.fullName}</h1>
                    <p>{user?.profile?.bio}</p>
                </div>
                <Button onClick = {()=>setOpen(true)} className ="text-right" variant="outline"><Pen/></Button>
                </div>
            <div className="flex items-center gap-3 my-2">
                <Mail/>
                <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
                <Contact/>
                <span>{user?.phoneNumber}</span>
            </div>
            <div>
                <h1 className="font-bold text-lg">Skills</h1>
                <div className="flex items-center gap-1">
                    {
                        user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((item,index)  => <div key={index}>{item}</div>) : <span>NA</span>
                    }
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-md font-bold">Resume</Label>
                {
                    isResume ? <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                }
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                <AppliedJobTable/>
            </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;