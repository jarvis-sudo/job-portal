import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setCompanies } from "../redux/companySlice";


const useGetAllCompanies = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                console.log("companyapi",COMPANY_API_END_POINT)
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                console.log("res",res);
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies;