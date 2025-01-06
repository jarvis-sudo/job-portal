import React from "react";
import { Table, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";

const ApplicantsTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FUllName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;