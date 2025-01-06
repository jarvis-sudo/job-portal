import React from "react";
import  { Table,TableBody,TableCaption, TableHead, TableHeader } from "../ui/table"

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>

                </TableHeader>
                <TableBody>
                    
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable;