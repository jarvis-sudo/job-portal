import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { useNavigate } from "react-router-dom";

const home = () => {
    useGetAllJobs();
    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    },[])
    return (
 <div>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
    
    
    
   </div>
    )}

export default home;