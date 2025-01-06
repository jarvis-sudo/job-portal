import React from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

const PostJob = () => {

    const submitHandler = () => {
        try {
            const res = axios.post(`${JOB_API_END_POINT}/post`, input , {
                headers : {
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs")
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value})
    }
    return (
        <div>
       {     <form onSubmit={submitHandler}>
                <div>
                    <div>
                        <Label>Title</Label>
                        <Input
                        type = 'text'
                        name = 'title'
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                        type="text"
                        name="description"
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input
                        type="text"
                        name="requirements"
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input
                        type="text"
                        name="salary"
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                        type="text"
                        name="location"
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Job type</Label>
                        <Input
                        type="text"
                        name="jobTypee"
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input
                        type="text"
                        name="experience"
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>No. of Position</Label>
                        <Input
                        type="number"
                        name="positions"
                        onChange={changeEventHandler}
                        />
                    </div>
                </div>
                <div>
                    <Button type="submit">Post new job</Button>
                </div>
            </form> }
        </div>
    )
}

export default PostJob;