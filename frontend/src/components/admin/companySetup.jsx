import React from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import {toast} from "sonner"

const companySetup = async () => {

    const [input,setInput] = useState({
        name : "",
        description: "",
        website : "",
        location : "",
        logo : ""
    })

    changeEventHandler = (e) => {
     setInput({...input,[e.target.name]:e.target.value})    
    }

    changeFileHandler =  (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }

    submitHandler = (e) => {
        const formData = new FormData();
        formData.append("companyname",input.companyname);
        formData.append("description",input.description);
        formData.append("website",input.website);
        formData.append("location",input.location);
        formData.append("logo",input.logo);
    }

    try {
        const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
            headers : {
                "Content-Type" : 'multipart/form-data'
            },
            withCredentials : true
        });
        if(res.data.success){
            toast.success(res.data.message);

        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }

    return(
        <div>
            <div>
                <form onSubmit={submitHandler} action="">
                    <div>
                        <h1>Company Setup</h1>
                    </div>
                    <div>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                            type = "text"
                            name = "compayname"
                            value ={input.companyname}
                            onChange = {changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                            type = "text"
                            name = "description"
                            value = {input.companyname}
                            onChange = {changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                            type = "text"
                            name = "website"
                            value = {input.companyname}
                            onChange = {changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                            type = "text"
                            name = "location"
                            value = {input.companyname}
                            onChange = {changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                            type = "file"
                            accept = "image/*"
                            name = "logo"
                            value = {logo.companyname}
                            onChange = {changeFileHandler}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default companySetup;