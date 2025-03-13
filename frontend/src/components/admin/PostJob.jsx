import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { toast } from "sonner";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import { JOB_API_END_POINT } from "../../utils/constant";



const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const navigate = useNavigate();

  const { companies } = useSelector(store => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name] : e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input , companyId:selectedCompany._id})
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    
    console.log(input)
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      
      console.error(error.response);
      toast.error(error.response?.data?.message);


    }
  };

  return (
    <div>
      <Navbar />
      
        <form onSubmit={submitHandler}>
          <div>
            <div>
              <Label>Title</Label>
              <Input 
              type="text" 
              name="title"
              value={input.title}
              onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input type="text" name="salary" 
              value={input.salary}
              onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No. of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            {/* companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger  claaName="w-[180px]">
                  <SelectValue placeholder="select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) */
            }
            { companies.length > 0 &&
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a company"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      companies.map((company) => {
                        return (
                          <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                        )
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            }
          </div>
          <div>
            <Button type="submit">Post new job</Button>
          </div>

          <p>*Please register a company first, before posting jobs</p>
        </form>
      
    </div>
  );
};

export default PostJob;
