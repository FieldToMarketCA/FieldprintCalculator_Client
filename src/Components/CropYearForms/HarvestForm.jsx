import { Divider, TextField } from "@mui/material";
// import BooleanQuestion from "../FormInputElements/BooleanQuestion";
// import MultiChoiceQuestion from "../FormInputElements/MultiChoiceQuestion";
// import NumberQuestion from "../FormInputElements/NumberQuestion";
import { useState, useEffect } from "react";
import FormSelectMachineField from "../FormInputElements/FormSelectMachineField";

import FormSelectField from "../FormInputElements/FormSelectField";
import FormTextField from "../FormInputElements/FormTextField";
import {
  CropYearCropDryingType,
  CropYearCropDryingFuel,
} from "../../Assets/DataTypes";
const SWATHERS = [
  {
    type: "SWATHER",
    name: "Mantis",
    HP: 800,
    fuelUse: null,
    defaultAcreHour: 2,
  },
];

const COMBINES = [
  {
    type: "COMBINE",
    name: "Simba",
    HP: 800,
    fuelUse: null,
    defaultAcreHour: 2,
  },
];

export default function HarvestForm() {
  return (
    <div className=" w-full h-full ">
      <h3 className="text-[rgb(102,102,102)] text-[30px]">Harvest</h3>
      <Divider sx={{ marginBottom: 3 }} />

      <section>
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px] mb-4">
          Equipment
        </h4>

        <div className="flex jusitify-start">
          <div className="w-[450px] mr-[25px]">
            <FormSelectMachineField
              fieldLabel={"Select Swather"}
              machineType={"SWATHERS"}
              machinesArray={SWATHERS}
            />
          </div>
        </div>

        <div className="flex jusitify-start">
          <div className="w-[450px] mr-[25px]">
            <FormSelectMachineField
              fieldLabel={"Select Combine"}
              machineType={"COMBINE"}
              machinesArray={COMBINES}
            />
          </div>
          <TextField
            type="number"
            label="Avg Speed Miles/Hr"
            sx={{ width: 200 }}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </div>
      </section>
      <section>
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px] mb-4">
          Crop Drying
        </h4>
        <FormSelectField
          valuesArray={CropYearCropDryingType}
          fieldLabel={"Crop drying -- type"}
          // fieldValue={}
          // helperText={"Crop Drying -- Type"}
          modalTitle={"Crop Drying -- Type"}
          modalDescription={"Some Really helpful description"}
        />
        <FormSelectField
          valuesArray={CropYearCropDryingFuel}
          fieldLabel={"Crop drying -- fuel"}
          // fieldValue={}
          // helperText={"Crop Drying -- Fuel"}
          modalTitle={"Crop Drying -- Fuel"}
          modalDescription={"Some Really helpful description"}
        />
      </section>
      <section className="pb-8">
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px] mb-4">
          Moisture Content
        </h4>
        <FormTextField
          fieldLabel={"% Before Drying"}
          isNumber={true}
          onChange={console.log}
          onBlur={console.log}
          modalTitle={"Moisture Content Before Drying"}
          modalDescription={
            "Please Enter the Percentage amount of Moisture in the soil before drying."
          }
        />
        <FormTextField
          fieldLabel={"% After Drying"}
          isNumber={true}
          onChange={console.log}
          onBlur={console.log}
          modalTitle={"Moisture Content After Drying"}
          modalDescription={
            "Please Enter the Percentage amount of Moisture in the soil after drying."
          }
        />
      </section>
    </div>
  );
}
