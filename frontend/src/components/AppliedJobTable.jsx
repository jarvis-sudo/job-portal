import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your Applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job role</TableHead>
                        <TableHead>Company</TableHead>                        
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>FullStack</TableCell>
                        <TableCell>anything</TableCell>
                        <TableCell>success</TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;