import React from "react";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const ApplicantsTable = () => {
    const {applicants} = useSelector(store => store.application);

    const statusHandler = async (status,id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
            console.log(res);
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants &&  applicants?.appliations?.map((item) => (
                            <tr>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>{
                                    item.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} >{item?.applicant?.prpfile?.resumeOriginalName}</a> : <span>NA</span>
}
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal/>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return(
                                                        <div onClick={() => statusHandler(status , item?._id)} key={index}>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;