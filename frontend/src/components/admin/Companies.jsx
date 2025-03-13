import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import {useNavigate} from "react-router-dom"
import Navbar from "../shared/Navbar";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";

const Companies = () => {
    useGetAllCompanies();
    const [input,setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    },[input])
    return (
        <div>
            <Navbar/>
            <div>
            <div>
                <Input
                placeholder="Filter by name"
                onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
            </div>
            <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies;