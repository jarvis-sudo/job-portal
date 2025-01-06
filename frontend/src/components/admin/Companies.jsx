import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";

const Companies = () => {
    return (
        <div>
            <div>
                <Input
                placeholder="Filter by name"
                onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={() => Navigate("/admin/companies/crete")}>New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
    )
}

export default Companies;