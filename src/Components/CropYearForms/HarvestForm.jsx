import { Divider, TextField } from "@mui/material";
import FormSelectMachineField from "../FormInputElements/FormSelectMachineField";

import FormSelectField from "../FormInputElements/FormSelectField";
import FormTextField from "../FormInputElements/FormTextField";

import {
  CropYearCropDryingType,
  CropYearCropDryingFuel,
} from "../../Assets/DataTypes";

import { CropYearContext } from "../../App";
import { useContext, useEffect } from "react";

export default function HarvestForm({ LowerPanel, panelControls }) {
  const cropyearContext = useContext(CropYearContext);

  function handleMachineOperation(event, machineType, key) {
    const newValue = {};
    newValue[key] = event.target.value;

    const updatedMachine = {
      ...cropyearContext.state.harvest[machineType],
      ...newValue,
    };

    // Create a copy with updated value for the corresponding Fertilizer Rate Update
    const updatedHarvestOperation = { ...cropyearContext.state.harvest };
    updatedHarvestOperation[machineType] = updatedMachine;

    cropyearContext.setter({
      ...cropyearContext.state,
      harvest: updatedHarvestOperation,
    });
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
    // console.log("mamichula", cropyearContext.state.harvest);
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
            <FormSelectMachineField
              fieldLabel={"Select Swather"}
              machineType={"swather"}
              machinesArray={SWATHERS}
              onChange={handleMachineOperation}
              fieldState={cropyearContext.state.harvest.swather}
            />
          </div>
        </div>

        <div className="flex jusitify-start">
          <div className="w-[450px] mr-[25px]">
            <FormSelectMachineField
              fieldLabel={"Select Combine"}
              machineType={"combine"}
              machinesArray={COMBINES}
              onChange={handleMachineOperation}
              fieldState={cropyearContext.state.harvest.combine}
            />
          </div>
          <TextField
            type="number"
            label="Avg Speed Miles/Hr"
            sx={{ width: 200 }}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => handleMachineOperation(e, "combine", "avgSpeed")}
            value={cropyearContext.state.harvest.avgSpeed}
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
        <FormTextField
          fieldLabel={"% Before Drying"}
          isNumber={true}
          onChange={(t) => handleMouistureChange(t, "beforeDrying")}
          modalTitle={"Moisture Content Before Drying"}
          modalDescription={
            "Please Enter the Percentage amount of Moisture in the soil before drying."
          }
          fieldState={cropyearContext.state.harvest.beforeDrying}
        />
        <FormTextField
          fieldLabel={"% After Drying"}
          isNumber={true}
          onChange={(t) => handleMouistureChange(t, "afterDrying")}
          modalTitle={"Moisture Content After Drying"}
          modalDescription={
            "Please Enter the Percentage amount of Moisture in the soil after drying."
          }
          fieldState={cropyearContext.state.harvest.afterDrying}
        />
      </section>
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

const SWATHERS = [
  {
    type: "SWATHER",
    name: "Swather 1",
    HP: 800,
    fuelUse: null,
    defaultAcreHour: 2,
  },
];

const COMBINES = [
  {
    type: "COMBINE",
    name: "Combine 1",
    HP: 800,
    fuelUse: null,
    defaultAcreHour: 2,
  },
];
