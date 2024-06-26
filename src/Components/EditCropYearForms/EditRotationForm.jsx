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
import dayjs from "dayjs";

import { CropYearContext } from "../../App";
import { useContext, useEffect, useState } from "react";

export default function EditRotationForm({ LowerPanel, panelControls }) {
  const cropyearContext = useContext(CropYearContext);
  const [errorFields, setErrorFields] = useState({
    cropYear: false,
    cropThisYear: false,
    cropFrequency: false,
    yieldValue: false,
    yieldUnits: false,
    previousCrop: false,
  });

  function handleStateChange(target, key) {
    const newValue = {};
    newValue[key] = target;

    // create a copy of crop obj
    const updatedCrop = { ...cropyearContext.state.crop, ...newValue };

    cropyearContext.setter({ ...cropyearContext.state, crop: updatedCrop });
    errorFields[key] = false;
  }
  useEffect(() => {
    const element = document.getElementById("scrollableDiv");
    element.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // function handleSaveAndAddFIeld() {
  //   if (isInputValid()) navigate("/addfield");
  // }

  function isInputValid() {
    errorFields.cropYear = cropyearContext.state.crop.cropYear === "";
    errorFields.cropThisYear =
      cropyearContext.state.crop.cropThisYear.trim() === "";
    errorFields.cropFrequency =
      cropyearContext.state.crop.cropFrequency.trim() === "";
    errorFields.yieldValue =
      cropyearContext.state.crop.yieldValue.toString().trim() === "";
    errorFields.yieldUnits =
      cropyearContext.state.crop.yieldUnits.trim() === "";
    errorFields.previousCrop =
      cropyearContext.state.crop.previousCrop.trim() === "";

    if (
      errorFields.cropYear ||
      errorFields.cropThisYear ||
      errorFields.cropFrequency ||
      errorFields.yieldValue ||
      errorFields.yieldUnits ||
      errorFields.previousCrop
    ) {
      setErrorFields({
        cropYear: errorFields.cropYear,
        cropThisYear: errorFields.cropThisYear,
        cropFrequency: errorFields.cropFrequency,
        yieldValue: errorFields.yieldValue,
        yieldUnits: errorFields.yieldUnits,
        previousCrop: errorFields.previousCrop,
      });
      return false; // return false because input is invalid
    } else {
      return true;
    }
  }

  return (
    <div className=" w-full h-full">
      <h3 className="text-[rgb(102,102,102)] text-[30px]">
        Rotation and Residue Practices
      </h3>
      <Divider sx={{ marginBottom: 3 }} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disableFuture
          views={["year"]}
          onChange={(e) => {
            if (e !== null) handleStateChange(e.$y, "cropYear");
          }}
          sx={{
            marginBottom: 3,
            bgcolor: errorFields.cropYear ? "rgb(255,234,234)" : "white",
          }}
          value={dayjs(cropyearContext.state.crop.cropYear.toString())}
          label="Crop Year"
        />
      </LocalizationProvider>

      <FormSelectField
        errorFound={errorFields.cropThisYear}
        valuesArray={CropYearCropTypes}
        fieldLabel={"Crop This year"}
        fieldState={cropyearContext.state.crop.cropThisYear}
        onChange={(e) => handleStateChange(e.target.value, "cropThisYear")}
        helperText={""}
        modalTitle={"Crop This Year"}
        modalDescription={"The crop for this year."}
      />

      <FormSelectField
        errorFound={errorFields.cropFrequency}
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
            errorFound={errorFields.yieldValue}
            isNumber={true}
            fieldState={cropyearContext.state.crop.yieldValue}
            fieldLabel={""}
            modalOff={true}
            onChange={(t) => handleStateChange(t, "yieldValue")}
          />
        </div>
        <div className="w-36 ml-4">
          <FormSelectField
            errorFound={errorFields.yieldUnits}
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
        errorFound={errorFields.previousCrop}
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
        isInputValid={isInputValid}
      />
    </div>
  );
}
