import { Divider } from "@mui/material";
import {
  CropYearCropTypes,
  CropYearCropFrequencyTypes,
  CropYearCropYieldUnitTypes,
} from "../../Assets/DataTypes";
import FormTextField from "../FormInputElements/FormTextField";
import FormSelectField from "../FormInputElements/FormSelectField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { CropYearContext } from "../../App";
import { useContext } from "react";

export default function RotationForm() {
  const cropyearContext = useContext(CropYearContext);

  function handleStateChange(target, key) {
    const newValue = {};
    newValue[key] = target;

    // create a copy of crop obj
    const updatedCrop = { ...cropyearContext.state.crop, ...newValue };
    console.log(updatedCrop);
    // console.log(cropyearContext);
    cropyearContext.setter({ ...cropyearContext.state, crop: updatedCrop });
  }

  return (
    <div className=" w-full h-full">
      <h3 className="text-[rgb(102,102,102)] text-[30px]">
        Rotation and Residue Practices
      </h3>
      <Divider sx={{ marginBottom: 3 }} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["year"]}
          onChange={(e) => handleStateChange(e.$y, "cropYear")}
          sx={{ marginBottom: 3 }}
          label="Crop Year"
        />
      </LocalizationProvider>

      <FormSelectField
        valuesArray={CropYearCropTypes}
        fieldLabel={"Crop This year"}
        fieldValue={""}
        onChange={(e) => handleStateChange(e.target.value, "cropThisYear")}
        helperText={""}
        modalTitle={"Crop This Year"}
        modalDescription={"The crop for this year."}
      />

      <FormSelectField
        valuesArray={CropYearCropFrequencyTypes}
        fieldLabel={"Crop Frequency"}
        fieldValue={""}
        onChange={(e) => handleStateChange(e.target.value, "cropFrequency")}
        helperText={"Frequency of this crop in rotation"}
        modalTitle={"Crop Frequency"}
        modalDescription={"Some Helpful description."}
      />
      <label>Yield</label>
      <div className="flex justify-start">
        <div>
          <FormTextField
            isNumber={true}
            fieldValue={cropyearContext.state.crop.yield}
            fieldLabel={""}
            modalOff={true}
            onChange={(t) => handleStateChange(t, "yield")}
          />
        </div>
        <div className="w-36 ml-4">
          <FormSelectField
            valuesArray={CropYearCropYieldUnitTypes}
            fieldLabel={"Units"}
            fieldValue={""}
            onChange={(e) => handleStateChange(e.target.value, "yieldUnits")}
            helperText={""}
            modalTitle={"Crop Prior Year"}
            modalDescription={"The crop for the previous year."}
          />
        </div>
      </div>
      <FormSelectField
        valuesArray={CropYearCropTypes}
        fieldLabel={"Crop Prior year"}
        fieldValue={""}
        onChange={(e) => handleStateChange(e.target.value, "previousCrop")}
        helperText={""}
        modalTitle={"Crop Prior Year"}
        modalDescription={"The crop for the previous year."}
      />
    </div>
  );
}
