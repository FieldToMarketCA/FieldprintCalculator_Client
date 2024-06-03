import { Divider, TextField } from "@mui/material";
// import FormSelectMachineField from "../FormInputElements/FormSelectMachineField";
import ViewFieldOperationMachine from "./ViewFieldOperationMachine";

import FormSelectField from "../FormInputElements/FormSelectField";
import FormTextField from "../FormInputElements/FormTextField";

import {
  CropYearCropDryingType,
  CropYearCropDryingFuel,
} from "../../Assets/DataTypes";

import { CropYearContext } from "../../App";
import { FarmContext } from "../../App";
import { useContext, useEffect, useState } from "react";

export default function HarvestForm({ LowerPanel, panelControls }) {
  const cropyearContext = useContext(CropYearContext);
  const farmContext = useContext(FarmContext);

  const [errorFields, setErrorFields] = useState({
    swather_machineObj: false,
    swather_hoursUsed: false,
    combine_machineObj: false,
    combine_hoursUsed: false,
    combine_avgSpeed: false,
  });

  function handleMachineOperation(event, machineType, key) {
    const newValue = {};
    newValue[key] = event.target.value;

    const updatedMachine = {
      ...cropyearContext.state.harvest[machineType.toLowerCase()],
      ...newValue,
    };

    // Create a copy with updated value for the corresponding Fertilizer Rate Update
    const updatedHarvestOperation = { ...cropyearContext.state.harvest };
    updatedHarvestOperation[machineType.toLowerCase()] = updatedMachine;

    cropyearContext.setter({
      ...cropyearContext.state,
      harvest: updatedHarvestOperation,
    });

    let newErrorValue = {};
    let errorKey = machineType + "_" + key;

    newErrorValue[errorKey] = false;
    setErrorFields({ ...errorFields, ...newErrorValue });
  }

  function handleCropDrying(target, key) {
    const newValue = {};
    newValue[key] = target;

    // create a copy of crop obj
    const updatedHarvest = { ...cropyearContext.state.harvest, ...newValue };

    cropyearContext.setter({
      ...cropyearContext.state,
      harvest: updatedHarvest,
    });
  }

  function handleMouistureChange(target, key) {
    const newValue = {};
    newValue[key] = target;

    const updatedMoisture = {
      ...cropyearContext.state.harvest.moisture,
      ...newValue,
    };

    const updatedHarvest = {
      ...cropyearContext.state.harvest,
      moisture: updatedMoisture,
    };
    cropyearContext.setter({
      ...cropyearContext.state,
      harvest: updatedHarvest,
    });
  }

  useEffect(() => {
    const element = document.getElementById("scrollableDiv");
    element.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
            <ViewFieldOperationMachine
              fieldLabel={"Select Swather"}
              fieldState={{
                ...cropyearContext.state.harvest.swather,
                machineObj: farmContext.state.machines.filter(
                  (machineObj) =>
                    machineObj._id.$oid ==
                    cropyearContext.state.harvest.swather.machineId
                )[0],
              }}
            />
          </div>
        </div>

        <div className="flex jusitify-start">
          <div className="w-[450px] mr-[25px]">
            <ViewFieldOperationMachine
              fieldLabel={"Select Combine"}
              fieldState={{
                ...cropyearContext.state.harvest.combine,
                machineObj: farmContext.state.machines.filter(
                  (machineObj) =>
                    machineObj._id.$oid ==
                    cropyearContext.state.harvest.combine.machineId
                )[0],
              }}
            />
          </div>
          <TextField
            error={errorFields.combine_avgSpeed}
            type="number"
            label="Avg Speed Miles/Hr"
            sx={{ width: 200 }}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => handleMachineOperation(e, "combine", "avgSpeed")}
            value={cropyearContext.state.harvest.combine.avgSpeed}
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
          modalTitle={"Crop Drying -- Type"}
          modalDescription={"Some Really helpful description"}
          onChange={(e) => handleCropDrying(e.target.value, "cropDryingType")}
          fieldState={cropyearContext.state.harvest.cropDryingType}
        />
        <FormSelectField
          valuesArray={CropYearCropDryingFuel}
          fieldLabel={"Crop drying -- fuel"}
          modalTitle={"Crop Drying -- Fuel"}
          modalDescription={"Some Really helpful description"}
          onChange={(e) => handleCropDrying(e.target.value, "cropDryingFuel")}
          fieldState={cropyearContext.state.harvest.cropDryingFuel}
        />
      </section>
      <section className="pb-8">
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px] mb-4">
          Moisture Content
        </h4>
        <div className="w-full flex items-center mb-6">
          <TextField
            sx={{ color: "#666666" }}
            label={"% Before Drying"}
            variant="outlined"
            value={
              cropyearContext.state.harvest.moisture
                ? cropyearContext.state.harvest.moisture.beforeDrying
                : 0
            }
          />
        </div>
        <div className="w-full flex items-center mb-6">
          <TextField
            sx={{ color: "#666666" }}
            label={"% Before Drying"}
            variant="outlined"
            value={
              cropyearContext.state.harvest.moisture
                ? cropyearContext.state.harvest.moisture.afterDrying
                : 0
            }
          />
        </div>
      </section>
      <LowerPanel
        activeStep={panelControls.activeStep}
        handleBack={panelControls.handleBack}
        handleNext={panelControls.handleNext}
        steps={panelControls.steps}
        handleComplete={panelControls.handleComplete}
        completedSteps={panelControls.completedSteps}
        totalSteps={panelControls.totalSteps}
        isInputValid={() => true}
      />
    </div>
  );
}

// const SWATHERS = [
//   {
//     type: "SWATHER",
//     name: "Swather 1",
//     HP: 800,
//     fuelUse: null,
//     defaultAcreHour: 2,
//   },
// ];

// const COMBINES = [
//   {
//     type: "COMBINE",
//     name: "Combine 1",
//     HP: 800,
//     fuelUse: null,
//     defaultAcreHour: 2,
//   },
// ];
