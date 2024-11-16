import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"



const Navbar = () => {
  const {user} = useSelector(store => store.auth)
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#f83002]">portal</span>
          </h1>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <ul className="flex font-medium gap-3">
            <Link to={'/jobs'}><li>Jobs</li></Link>
            <Link to={'/home'}><li>Home</li></Link>
            <Link to='/browse'><li>Browse</li></Link>
            
          </ul>
          {
          !user ? (
            <div className="flex items-center gap-2">
              <Link to='/login'><Button variant="outline">login</Button></Link>
              <Link to='/signup'><Button className="bg-[#6A38C2]">SignUp</Button></Link>
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-2 space-y-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Username</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Link to='/profile'>
                    <Button variant="link">View Profile</Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Button variant="link">Log out</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </>
  );
};



export default Navbar;
