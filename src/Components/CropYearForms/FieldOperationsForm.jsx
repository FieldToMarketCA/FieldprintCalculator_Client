import { Divider } from "@mui/material";
import BooleanQuestion from "../FormInputElements/BooleanQuestion";
import MultiChoiceQuestion from "../FormInputElements/MultiChoiceQuestion";
import NumberQuestion from "../FormInputElements/NumberQuestion";
import { useState, useEffect } from "react";
import FormSelectCultivationTractorField from "../FormInputElements/FormSelectCultivationTractorField";
import FormSelectFertilizerTractorField from "../FormInputElements/FormSelectFertilizerTractorField";
import FormSelectSprayerField from "../FormInputElements/FormSelectSprayerField";

import { FertilizerTypes } from "../../Assets/DataTypes";

import FertilizerTableField from "../../Components/FormInputElements/FertilizerTableField";

import { CropYearContext } from "../../App";
import { useContext } from "react";

const cultivationOperationType = { machineId: "", hoursOfOperation: 0 };

export default function FieldOperationsForm() {
  const cropyearContext = useContext(CropYearContext);

  const [usedFertilizer, setUsedFertilizer] = useState(false);
  const [numberOfCultivation, setNumberOfCultivation] = useState(1);
  const [cultivationOperations, setCultivationOperations] = useState([
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
  ]);
  const [numberOfPesticide, setNumberOfPesticide] = useState(0);
  const [pesticideOperations, setPesticideOperations] = useState([
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
  ]);

  const [fertilizersUsed, setFertilizerUsed] = useState({});

  function handleCultivationOperation(event, key, index) {
    const newValue = {};
    newValue[key] = event.target.value;

    // Create a copy with updated value for the corresponding cultivation operation
    const updatedCultivationOperation = {
      ...cropyearContext.state.fieldOperations.cultivations[index],
      ...newValue,
    };

    // Create a copy of the cultivations array and override data inplace
    const updatedCultivationsArray = [
      ...cropyearContext.state.fieldOperations.cultivations,
    ];
    updatedCultivationsArray[index] = updatedCultivationOperation;

    // Create copy of current state fieldOperations and assign new cultivations array
    const updatedFieldOperations = {
      ...cropyearContext.state.fieldOperations,
      cultivations: updatedCultivationsArray,
    };

    // Update cropyearContext with new cultivations Array Data
    cropyearContext.setter({
      ...cropyearContext.state,
      fieldOperations: updatedFieldOperations,
    });
  }

  function handleFertilizerOperation(event, key, seedStage) {
    let newValue = {};

    if (key === "date") {
      newValue[key] = event.$d.toISOString();
    } else {
      newValue[key] = event.target.value;
    }

    // Create a copy with updated value for the corresponding Fertilizer operation
    const updatedFertilizerOperation = {
      ...cropyearContext.state.fieldOperations.fertilizerApplications[
        seedStage
      ],
      ...newValue,
    };

    // Create a copy of the fertilizerOperations Object and override data inplace
    const updatedFertilizerOperationObj = {
      ...cropyearContext.state.fieldOperations.fertilizerApplications,
    };
    updatedFertilizerOperationObj[seedStage] = updatedFertilizerOperation;

    // Create copy of current state fieldOperations and assign new cultivations array
    const updatedFieldOperations = {
      ...cropyearContext.state.fieldOperations,
      fertilizerApplications: updatedFertilizerOperationObj,
    };

    // Update cropyearContext with new fertilizerApplications object
    cropyearContext.setter({
      ...cropyearContext.state,
      fieldOperations: updatedFieldOperations,
    });
    console.log(
      cropyearContext.state.fieldOperations.fertilizerApplications,
      seedStage,
      "watamami"
    );
  }

  function handleFertilizerRate(target, key, seedStage) {
    const newValue = {};
    newValue[seedStage] = target;

    // Create a copy with updated value for the corresponding Fertilizer Rate Update
    const updatedFertilizerRate = {
      ...cropyearContext.state.fieldOperations.fertilizerRates[key],
      ...newValue,
    };

    // Create a copy of the fertilizerRate Object and override data inplace
    const updatedFertilizerRateObj = {
      ...cropyearContext.state.fieldOperations.fertilizerRates,
    };
    updatedFertilizerRateObj[key] = updatedFertilizerRate;

    // Create copy of current state fieldOperations and assign new fertilizerRate Object
    const updatedFieldOperations = {
      ...cropyearContext.state.fieldOperations,
      fertilizerRates: updatedFertilizerRateObj,
    };

    // Update cropyearContext with new fertilizerRates object
    cropyearContext.setter({
      ...cropyearContext.state,
      fieldOperations: updatedFieldOperations,
    });
    console.log(
      cropyearContext.state.fieldOperations.fertilizerRates,
      key,
      "watamami"
    );
  }

  function handlePesticideOperation(event, key, index) {
    const newValue = {};
    newValue[key] = event.target.value;

    // Create a copy with updated value for the corresponding pesticide operation
    const updatedPesticideOperation = {
      ...cropyearContext.state.fieldOperations.pesticidesApplications[index],
      ...newValue,
    };

    // Create a copy of the pesticides array and override data inplace
    const updatedPesticideApplicationsArray = [
      ...cropyearContext.state.fieldOperations.pesticidesApplications,
    ];
    updatedPesticideApplicationsArray[index] = updatedPesticideOperation;

    // Create copy of current state fieldOperations and assign new pesticides array
    const updatedFieldOperations = {
      ...cropyearContext.state.fieldOperations,
      pesticidesApplications: updatedPesticideApplicationsArray,
    };

    // Update cropyearContext with new pesticides Array Data
    cropyearContext.setter({
      ...cropyearContext.state,
      fieldOperations: updatedFieldOperations,
    });
  }

  useEffect(() => {
    const element = document.getElementById("scrollableDiv");
    element.scrollBy({ top: 100, left: 0, behavior: "smooth" });
  }, [numberOfPesticide]);

  function handleCheckmark(event, key) {
    let entry = {};
    entry[key] = event.target.checked;

    setFertilizerUsed({ ...fertilizersUsed, ...entry });
  }

  function handleBooleanQuestion(e) {
    setFertilizerUsed(e.target.value === "true");
  }
  return (
    <div className=" w-full h-full">
      <h3 className="text-[rgb(102,102,102)] text-[30px]">Field Operations</h3>
      <Divider sx={{ marginBottom: 3 }} />

      <section>
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px]">
          Cultivation
        </h4>
        <NumberQuestion
          min={1}
          max={5}
          fieldValue={numberOfCultivation}
          questionText={
            "How many cultivation operations this field had this crop year?"
          }
          modalTitle={"Number of Cultivation Operations"}
          modalDescription={
            "Please provide the number of cultivation operations you had in this year for this specific field."
          }
          onChange={setNumberOfCultivation}
        />

        <ul className="transition-all duration-500">
          {cultivationOperations.map((cultivation, index) => {
            if (index > numberOfCultivation - 1) return;
            return (
              <FormSelectCultivationTractorField
                key={cultivation}
                fieldLabel={"Tractor Used in Cultivation #" + (index + 1)}
                tractorsArray={TRACTORS}
                onChange={handleCultivationOperation}
                index={index}
              />
            );
          })}
        </ul>
      </section>

      <section className="pb-5">
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px]">
          Fertilizer Application
        </h4>
        <BooleanQuestion
          handleChange={handleBooleanQuestion}
          fieldValue={0}
          modalTitle={"Fertilizer"}
          modalDescription={
            "Was commercial fertilizer or manure applied for the analyzed crop?"
          }
          fieldLabel={
            "Did you apply fertilizer (either organic or inorganic source) this crop year?"
          }
        />
        <div
          style={{ height: fertilizersUsed ? "272px" : "0" }}
          className={`transition-all duration-300  w-full  overflow-hidden`}
        >
          <p className="text-[#666666] mb-2">Tractors Used</p>
          {[
            { seedStage: "preSeed", label: "Pre Seed Tractor" },
            { seedStage: "seed", label: "Seed Tractor" },
            { seedStage: "postSeed", label: "Post Seed Tractor" },
          ].map((operation, index) => {
            return (
              <li className="flex " key={operation.seedStage}>
                <FormSelectFertilizerTractorField
                  fieldLabel={operation.label}
                  tractorsArray={TRACTORS}
                  fieldState={
                    cropyearContext.state.fieldOperations
                      .fertilizerApplications[operation.seedStage]
                  }
                  seedStage={operation.seedStage}
                  onChange={handleFertilizerOperation}
                />
              </li>
            );
          })}
        </div>
      </section>

      <section
        style={{
          height: fertilizersUsed ? "auto" : "0",
          padingBottom: fertilizersUsed ? "20px" : "0",
        }}
        className={`transition-all duration-300  w-full  overflow-hidden`}
      >
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px]">
          Fertilizer Rates (lbs/acre)
        </h4>
        <MultiChoiceQuestion
          valuesArray={FertilizerTypes}
          handleCheckmark={handleCheckmark}
          questionText={
            "Which Fertilizers did you apply during this Crop Year?"
          }
          modalTitle={"Fertilizer Rates"}
          modalDescription={
            "Please select the fertilizers applied to your field during this crop year and specifiy the corresponding rates."
          }
        />

        <ul>
          {FertilizerTypes.map((fertilizer, index) => {
            var key = fertilizer.value;

            var isChecked = fertilizersUsed[key];

            if (isChecked)
              return (
                <li key={key}>
                  <FertilizerTableField
                    onChange={handleFertilizerRate}
                    fertilizerName={fertilizer.label}
                    elementCode={fertilizer.value}
                  />
                </li>
              );
          })}
        </ul>
      </section>

      <section className="pb-5">
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px]">
          Pesticide
        </h4>

        <NumberQuestion
          min={0}
          max={5}
          fieldValue={numberOfPesticide}
          questionText={
            "How many pesticide operations this field had this crop year?"
          }
          modalTitle={"Number of Pesticide Operations"}
          modalDescription={
            "Please provide the number of pesticide operations you had in this year for this specific field."
          }
          onChange={setNumberOfPesticide}
        />

        <ul className="transition-all duration-500">
          {pesticideOperations.map((pesticide, index) => {
            if (index > numberOfPesticide - 1) return;
            return (
              <FormSelectSprayerField
                key={index}
                fieldLabel={"Sprayer in Fumigation #" + (index + 1)}
                sprayersArray={SPRAYERS}
                onChange={handleCultivationOperation}
                index={index}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}

const TRACTORS = [
  {
    type: "TRACTOR",
    name: "Mate",
    HP: 800,
    fuelUse: null,
    defaultAcreHour: 2,
  },
];
const SPRAYERS = [
  {
    type: "SPRAYER",
    name: "Mosquito",
    HP: 150,
    fuelUse: null,
    defaultAcreHour: 30,
  },
];
