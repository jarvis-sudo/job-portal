import React, { useTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authslice";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
            {
              user && user.role === 'recruiter' ? (
                <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/Jobs">Jobs</Link></li>

                </>
              ) : (
                <>
<Link to={"/home"}>
              <li>Home</li>
            </Link>
            <Link to={"/jobs"}>
              <li>Jobs</li>
            </Link>
            <Link to="/browse">
              <li>Browse</li>
            </Link>
            </>
              )
            }
            
            
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2]">SignUp</Button>
              </Link>
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
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Link to="/profile">
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center gap-2 cursor-pointer">
                    <Button onClick={logoutHandler} variant="link">
                      Log out
                    </Button>
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
