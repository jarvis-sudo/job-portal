import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllAdminJobs } from "../redux/jobSlice";


const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedjobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAdminJobs);
                }
            } catch (error) {
                console.log(error);                
            }
           
        }
        fetchAppliedjobs();
    },[]);

}