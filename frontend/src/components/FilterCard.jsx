import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    filterType: "Locaton",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh-5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full p-3 ">
      <div>
        <h1>Filter Jobs</h1>
        <hr />
        <RadioGroup>
          {filterData.map((data, index) => (
            <div>
              <h1>{data.filterType}</h1>
              {data.array.map((item, index) => {
                return (
                  <div>
                    <RadioGroupItem value="item" />
                    <Label>{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
