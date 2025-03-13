import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
  import {Label} from "./ui/label"
  import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import {Button} from "./ui/button"
import {USER_API_END_POINT} from '../utils/constant'
import { toast } from "sonner";
import axios from 'axios';
import { Loader2 } from "lucide-react";
import { setUser } from "../redux/authSlice";


const UpdateProfileDialog = ({open,setOpen}) => {

    const {user} = useSelector(store => store.auth)
    const [loading,setLoading] = useState(false);

    console.log(user)
    
    console.log(user?.fullName,user?.email,user?.phoneNumber,user?.profile?.bio,user?.profile?.skills)

    const [input,setInput] = useState({
        
        fullName : user?.fullName || "",
        email : user?.email || "",
        phoneNumber : user?.phoneNumber || "",
        bio : user?.profile?.bio || "hello bio",
        skills : user?.profile?.skills?.join(',') || "",
        file : null
        })

        const dispatch = useDispatch();

        const changeEventHandler = (e) => {
            setInput({...input,[e.target.name]:e.target.value})
        }

        const fileChangeHandler = (e) => {
            const file = e.target.files?.[0];
            setInput({...input,file})
        }

        const submitHandler = async (e) => {
            e.preventDefault();
            
            console.log("form submittted data:" , input)
            const formData = new FormData();
            formData.append("id",input.uid);
            formData.append("fullName",input.fullName);
            formData.append("email",input.email);
            formData.append("phoneNumber",input.phoneNumber);
            formData.append("bio",input.bio);
            formData.append("skills",input.skills.split(',').map(skill => skill.trim()));
            if(input.file){
                formData.append("file",input.file);
            }

            try {
                setLoading(true);
                const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                     },
                     withCredentials : true
                })

                console.log("API response : ",res.data )

                if(res.data.success){
                   // onUpdateProfile(res.data.user)
                  // console.log("Updated user:", res.data.user);
                    dispatch(setUser(res.data.user))
                    toast.success(res.data.message)
                    

                }
    

            } catch (error) {
                console.error(error)
                toast.error(error?.response?.data?.message)
            }
            finally{
                setLoading(false);
            }
            setOpen(false);
            console.log(input)
        }


    return(
        <div>
            <Dialog open={open}>
                <DialogContent onInteractOutside = {() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                id = "fullName"
                                name = "fullName"
                                type = "text"
                                value = {input.fullName}
                                onChange = {changeEventHandler}
                                className ="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                id = "email"
                                name = "email"
                                type = "email"
                                value = {input.email}
                                onChange = {changeEventHandler}
                                className ="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                id = "phoneNumber"
                                name = "phoneNumber"
                                type = "text"
                                value = {input.phoneNumber}
                                onChange = {changeEventHandler}
                                className ="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                id = "bio"
                                name = "bio"
                                
                                value = {input.bio}
                                onChange = {changeEventHandler}
                                className ="cols-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Skills</Label>
                                <Input
                                id = "skills"
                                name = "skills"
                        
                                value = {input.skills}
                                onChange = {changeEventHandler}
                                className ="cols-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label>Resume</Label>
                                <Input
                                id = "resume"
                                name = "resume"
                                type = "file"
                                accept = "application/pdf"
                                
                                onChange = {fileChangeHandler}
                                className ="cols-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {

                            loading ? <Button className="w-full">
                                <Loader2 className="animate-spin"/>
                            </Button> 
                            :
                            <Button type="submit" className="w-full">Update</Button>
                            }
                            </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog;