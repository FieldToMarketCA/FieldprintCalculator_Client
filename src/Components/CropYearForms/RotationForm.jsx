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
import { useContext, useEffect } from "react";

export default function RotationForm({ LowerPanel, panelControls }) {
  const cropyearContext = useContext(CropYearContext);

  function handleStateChange(target, key) {
    const newValue = {};
    newValue[key] = target;

    // create a copy of crop obj
    const updatedCrop = { ...cropyearContext.state.crop, ...newValue };

    cropyearContext.setter({ ...cropyearContext.state, crop: updatedCrop });
  }
  useEffect(() => {
    const element = document.getElementById("scrollableDiv");
    element.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" w-full h-full">
      <h3 className="text-[rgb(102,102,102)] text-[30px]">
        Rotation and Residue Practices
      </h3>
      <Divider sx={{ marginBottom: 3 }} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["year"]}
          onChange={(e) => {
            if (e !== null) handleStateChange(e.$y, "cropYear");
          }}
          sx={{ marginBottom: 3 }}
          label="Crop Year"
        />
      </LocalizationProvider>

      <FormSelectField
        valuesArray={CropYearCropTypes}
        fieldLabel={"Crop This year"}
        fieldState={cropyearContext.state.crop.cropThisYear}
        onChange={(e) => handleStateChange(e.target.value, "cropThisYear")}
        helperText={""}
        modalTitle={"Crop This Year"}
        modalDescription={"The crop for this year."}
      />

      <FormSelectField
        valuesArray={CropYearCropFrequencyTypes}
        fieldLabel={"Crop Frequency"}
        onChange={(e) => handleStateChange(e.target.value, "cropFrequency")}
        helperText={"Frequency of this crop in rotation"}
        modalTitle={"Crop Frequency"}
        modalDescription={"Some Helpful description."}
        fieldState={cropyearContext.state.crop.cropFrequency}
      />
      <label>Yield</label>
      <div className="flex justify-start">
        <div>
          <FormTextField
            isNumber={true}
            fieldState={cropyearContext.state.crop.yield}
            fieldLabel={""}
            modalOff={true}
            onChange={(t) => handleStateChange(t, "yield")}
          />
        </div>
        <div className="w-36 ml-4">
          <FormSelectField
            valuesArray={CropYearCropYieldUnitTypes}
            fieldLabel={"Units"}
            onChange={(e) => handleStateChange(e.target.value, "yieldUnits")}
            helperText={""}
            modalTitle={"Crop Prior Year"}
            modalDescription={"The crop for the previous year."}
            fieldState={cropyearContext.state.crop.yieldUnits}
          />
        </div>
      </div>
      <FormSelectField
        valuesArray={CropYearCropTypes}
        fieldLabel={"Crop Prior year"}
        onChange={(e) => handleStateChange(e.target.value, "previousCrop")}
        helperText={""}
        modalTitle={"Crop Prior Year"}
        modalDescription={"The crop for the previous year."}
        fieldState={cropyearContext.state.crop.previousCrop}
      />

      <LowerPanel
        activeStep={panelControls.activeStep}
        handleBack={panelControls.handleBack}
        handleNext={panelControls.handleNext}
        steps={panelControls.steps}
        handleComplete={panelControls.handleComplete}
        completedSteps={panelControls.completedSteps}
        totalSteps={panelControls.totalSteps}
      />
    </div>
  );
}
