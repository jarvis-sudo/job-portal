import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const AdminJobs = () => {
    const navigate = useNavigate();
    return(
        <div>
            <div>
                <Input
                className="w-fit"
                placeholder="Filter by name,role"
                oonChange={(e) => setInput(e.target.value)}
                />

                <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
            </div>
        </div>
    )
}

export default AdminJobs;