import { Divider } from "@mui/material";
import {
  CropYearCropTypes,
  CropYearCropFrequencyTypes,
  CropYearCropYieldUnitTypes,
} from "../../Assets/DataTypes";
import FormTextField from "../FormInputElements/FormTextField";
import FormSelectField from "../FormInputElements/FormSelectField";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Crop Year

// Crop this year

// Frequency of this crop in rotation

// Yield

// Crop prior year

export default function RotationForm() {
  return (
    <div className=" w-full h-full">
      <h3 className="text-[rgb(102,102,102)] text-[30px]">
        Rotation and Residue Practices
      </h3>
      <Divider sx={{ marginBottom: 3 }} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker sx={{ marginBottom: 3 }} label="Crop Year" />
      </LocalizationProvider>

      <FormSelectField
        valuesArray={CropYearCropTypes}
        fieldLabel={"Crop This year"}
        fieldValue={""}
        helperText={""}
        modalTitle={"Crop This Year"}
        modalDescription={"The crop for this year."}
      />

      <FormSelectField
        valuesArray={CropYearCropFrequencyTypes}
        fieldLabel={"Crop Frequency"}
        fieldValue={""}
        helperText={"Frequency of this crop in rotation"}
        modalTitle={"Crop Frequency"}
        modalDescription={"Some Helpful description."}
      />
      <label>Yield</label>
      <div className="flex justify-start">
        <div>
          <FormTextField
            fieldValue={""}
            fieldLabel={""}
            // modalTitle={"Yield"}
            // modalDescription={"Some helpful description."}
            modalOff={true}
          />
        </div>
        <div className="w-28 ml-4">
          <FormSelectField
            valuesArray={CropYearCropYieldUnitTypes}
            fieldLabel={"Units"}
            fieldValue={"bu/ac"}
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
        helperText={""}
        modalTitle={"Crop Prior Year"}
        modalDescription={"The crop for the previous year."}
      />
    </div>
  );
}
