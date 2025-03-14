import React, { useEffect, useMemo, useState } from "react";
import  { Table,TableBody,TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar , AvatarImage} from "../ui/avatar"
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
   
    const {companies=[],searchCompanyByText} = useSelector(store => store.company)
    const [filterCompany,setFilterCompany] = useState(companies);
    const navigate = useNavigate();

   useEffect(() => {
    

    if(companies?.length > 0) {
        const filteredCompany = companies?.length >=0 && companies.filter((company) => {
            if(!searchCompanyByText){
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterCompany(filteredCompany);
    }
    else{
        setFilterCompany([]);
    }

    },[companies,searchCompanyByText])


/*const filteredCompany = useMemo(() => {
    return companies.length >= 0 && companies.filter((company) => {
        if (!searchCompanyByText) {
            return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
}, [companies, searchCompanyByText]);

useEffect(() => {
    setFilterCompany(filteredCompany);
}, [filteredCompany]);
*/


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                
                    {
                        filterCompany.length > 0 ? (
                    filterCompany.map((company) => (
                        
                    
                        
                    
                            <TableRow key={company._id}> 
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar> 
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                   <Popover>
                                    <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                    <PopoverContent  className="w-32">
                                        <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                            <Edit2 className="w-4"/>
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                    </Popover> 
                                </TableCell> 
                            </TableRow>)

                                 ))
                             : (
                                <TableRow>
                                    <TableCell >
                                    No companies found.
                                    </TableCell>
                                </TableRow>
                            )
                    
}
                    
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable;