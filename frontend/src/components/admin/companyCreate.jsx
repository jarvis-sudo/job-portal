import React from "react";

const companyCreate = () => {
    return (
        <div>
            <div>
                <h1>Your company Name</h1>
                <p>What would you like to give your company name? YOu cant change this later.</p>
            </div>

            <Label>Company Name</Label>
            <Input
            type="text"
            placeholder="JobHunt,Microsoft etc."
            onChange={(e) => setCompanyName(e.target,value)}
            />
            <div>
                <Button>Cancel</Button>
                <Button>Continue</Button>
            </div>
        </div>
    )
}

export default companyCreate;