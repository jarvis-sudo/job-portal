import React from "react";
import Table, { TableCaption, TableHead, TableHeader, TableRow } from "../ui/table"

const AdminJobsTable = () => {
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
                    
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable;