import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading,setUser } from "../../redux/authSlice";

const Login = () => {
    const [input,setInput] = useState({
    
        email : "",
        
        password : "",
        role : "",
        
      })
      //const[loading,setLoading] = useState(false);
      const {user} = useSelector(store => store.auth)
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value});
    
      }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);

        try {
          dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/login`, input , {
            headers : {
              "Content-Type" : "application/json"
            },
            withCredentials : true,
          })

          if(res.data.success){
            dispatch(setUser(res.data.user))
            navigate('/');
            toast.success(res.data.message)

          }


        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        }
        finally{
          dispatch(setLoading(false));
        }

      }
    return (
        <div className="flex items-center justify-center max-w-7xl mx-auto">
      
        <form onSubmit={submitHandler} className="w-1/2 border p-4 my-10">
        <h1 className="font-bold text-xl mb-5">Login</h1>
       
        <div className="my-2">
          <label htmlFor="email">Email</label>
          <Input type="text" value={input.email} name="email" onChange={changeEventHandler} placeholder="email" id="email" />
        </div>
        
        <div className="my-2">
          <label htmlFor="password">Password</label>
          <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Password" id="password" />
        </div>
        <div className="my-2">
          <RadioGroup className="flex items-center">
            <div className="flex items-center">
            <Input
            type = "radio"
            name ="role"
            value  ="student"
            checked={input.role==='student'}
            onChange={changeEventHandler}
            className='cursor-pointer'
            />
            <Label>Student</Label>
        </div>
        <div className="flex items-center">
            <Input 
            type = "radio"
            value = "recruiter"
            name = "role"
            checked ={input.role==='recruiter'}
            onChange ={changeEventHandler}
            className = "cursor-pointer"
            />
            <Label>recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        
       
       <Button type="submit" className="w-full">Login</Button>
       <span className="text-sm">Don't have an account? <Link to='/signup'>Signup</Link></span>
       
    
   
    </form>
      
    </div>
    )
}

export default Login;