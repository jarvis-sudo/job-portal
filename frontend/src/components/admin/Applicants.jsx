import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import Navbar from "../shared/Navbar";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setAllApplicants} from "@/redux/applicationSlice";
import axios from "axios";

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);


    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {withCredentials:true})
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [])

    return (
        <div>
            <Navbar/>
            <div>
                <h1>Applicants {applicants?.applications?.length}</h1>
                <ApplicantsTable/>
            </div>
        </div>
    )
 }

 export default Applicants;