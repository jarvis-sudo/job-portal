import React, { useEffect, useState } from "react";
import  { Table , TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

const AdminJobsTable = () => {
    const {allAdminJobs,searchJobByText} = useSelector(store => store.job);

    const [filterJobs,setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
       // console.log(allAdminJobs);
        const filteredJobs = allAdminJobs.filter((job) => {
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
               <TableBody>
                    {
                        filterJobs?.length ? (
                        filterJobs?.map((job) => (
                            <tr key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                        <PopoverContent>
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                                <span>Edit</span>
                                            </div>

                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell> 
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <TableCell>
                                No Jobs Found.
                            </TableCell>
                        </tr>
                    )
                    }
                </TableBody> 

                

            </Table>
        </div>
    )
}

export default AdminJobsTable;