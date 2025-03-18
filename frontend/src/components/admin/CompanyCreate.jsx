import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "../../redux/companySlice";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";

const CompanyCreate = () => {
    const [companyName , setCompanyName] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName} , {
                headers : {
                    'Content-Type' : 'application/json'
                },
                withCredentials:true
            });
            console.log("above : "+res.data)
            if(res?.data?.success) {
                console.log("Company regstd : ", res.data.company);
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                console.log(companyId);
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(2);
            console.error("full error obj : ", error)
            console.error("error response : " , error.response?.data);
        }
    }


    return (
        <div>
            <Navbar/>
            <div className="my-10">
                <h1 className="font-bold text-2xl">Your company Name</h1>
                <p className="text-gray-500">What would you like to give your company name? You cant change this later.</p>
            </div>

            <Label>Company Name</Label>
            <Input
            type="text"
            placeholder="JobHunt,Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
            />
            <div>
                <Button>Cancel</Button>
                <Button onClick={registerNewCompany}>Continue</Button>
            </div>
        </div>
    )
}

export default CompanyCreate;
