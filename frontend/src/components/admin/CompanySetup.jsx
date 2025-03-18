import React, { useEffect, useState } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import useGetCompanyById from "../../hooks/useGetCompanyById";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Loader, Loader2 } from 'lucide-react';



const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const {singleCompany} = useSelector(store => store.company);
  const [loading,setLoading] = useState(false);


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    console.log(e);
    console.log("!!!")
    const file = e.target.files?.[0];
    setInput({ ...input, file:file})
    };
 
  const submitHandler = async (e) => {

    e.preventDefault();
    console.log("clicked!!!")

    console.log(input);
    const formData = new FormData();
    formData.append("companyname", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(1)
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error("fulll error : ",error);
      console.log(2)
      toast.error(error.response?.data?.message);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    
      console.log("s_company" , singleCompany)
      setInput({
        name: singleCompany.name || "",
        description : singleCompany.description || "",
        website : singleCompany.website || "",
        location : singleCompany.location || "",
        file : singleCompany.file || null
      })
    
    
  },[singleCompany])
  return (
    <div>
        <Navbar/>         
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler} >
          <div className="flex items-center gap-5 p-8">
            <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
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
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
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
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {
            loading ? <Button><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button> 
            :
             <Button type="submit" className="w-full my-4">Update</Button>
          }
                
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
