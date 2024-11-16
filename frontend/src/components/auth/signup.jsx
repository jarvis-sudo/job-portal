import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar";
import axios from "axios"
import { Toaster } from "@/components/ui/sonner"
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";

const signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("fullName",input.fullName)    
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)
    
    if(input.file){
      formData.append("file",input.file)
    }

    console.log("Sending data:", Object.fromEntries(formData)); // Log the form data

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers : { 'Content-Type' : "multipart/form-data"},
        withCredentials:true
      })
      if(res.data.success){
       toast.success(res.data.message)
        navigate("/login");

      }


    } catch(error) {
      toast.error(error.res.data.message)
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.log('Error response:', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error message:', error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border p-4 my-10">
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="fullName"
              id="fullname"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="email"
              id="email"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Phone Number"
              id="phonenumber"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
              id="password"
            />
          </div>
          <div className="my-2">
            <RadioGroup className="flex items-center">
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex  items-center">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            {/* <RadioGroup value={input.role} 
          onChange={(value) => setInput({...input, role:value})}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="option-one" />
              <Label htmlFor="option-one">student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recruiter" id="option-two" />
              <Label htmlFor="option-two">recruiter</Label>
            </div>
          </RadioGroup> */}
          </div>
          <div className="my-2">
            <Label>Profile</Label>
            <Input
              accept="/image/*"
              onChange={changeFileHandler}
              type="file"
              className="cursor-pointer"
            />
          </div>
          <Button className="w-full" type="submit">
            Signup
          </Button>
          <span className="text-sm">
            Already have an account? <Link to="/login">login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default signup;
