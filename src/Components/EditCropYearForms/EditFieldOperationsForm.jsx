import { Divider } from "@mui/material";
import BooleanQuestion from "../FormInputElements/BooleanQuestion";
import MultiChoiceQuestion from "../FormInputElements/MultiChoiceQuestion";
import ViewMultiChoiceQuestion from "./ViewMultiChoiceQuestion";
import NumberQuestion from "../FormInputElements/NumberQuestion";
import { useState, useEffect } from "react";

import { FertilizerTypes } from "../../Assets/DataTypes";

import FertilizerTableField from "../../Components/FormInputElements/FertilizerTableField";

import { CropYearContext, FarmContext } from "../../App";
import { useContext } from "react";
import ViewFieldOperationMachine from "./ViewFieldOperationMachine";
import DisplayFertilizerTractorField from "./DisplayFertilizerTractorField";

const cultivationOperationType = { machineObj: "", hoursOfOperation: 0 };

export default function EditFieldOperationsForm({ LowerPanel, panelControls }) {
  const cropyearContext = useContext(CropYearContext);
  const farmContext = useContext(FarmContext);

  const [usedFertilizer, setUsedFertilizer] = useState(
    ["preSeed", "withSeed", "postSeed"].some((fieldKey) => {
      return (
        cropyearContext.state.fieldOperations.fertilizerApplications[fieldKey]
          .machineObj !== ""
      );
    })
  );
  const [numberOfCultivation, setNumberOfCultivation] = useState(
    cropyearContext.state.fieldOperations.cultivations.filter(
      (operation) => "machineObj" in operation && operation.machineObj !== ""
    ).length
  );

  const [numberOfPesticide, setNumberOfPesticide] = useState(
    cropyearContext.state.fieldOperations.pesticidesApplications.filter(
      (operation) => "machineId" in operation && operation.machineId !== ""
    ).length
  );

  let FertilizerUserdInitialState = {};

  for (const type of FertilizerTypes) {
    let rate =
      cropyearContext.state.fieldOperations.fertilizerRates[type.value];
    FertilizerUserdInitialState[type.value] =
      rate.preSeed !== 0 || rate.withSeed !== 0 || rate.postSeed !== 0;
  }

  const [fertilizersUsed, setFertilizerUsed] = useState({
    ...FertilizerUserdInitialState,
  });

  console.log(FertilizerUserdInitialState);
  useEffect(() => {
    const element = document.getElementById("scrollableDiv");
    element.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
          max={4}
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
          {cropyearContext.state.fieldOperations.cultivations.map(
            (cultivation, index) => {
              if (index > numberOfCultivation - 1) return;

              return (
                <ViewFieldOperationMachine
                  key={index}
                  fieldLabel={"Tractor Used in Cultivation #" + (index + 1)}
                  fieldState={cultivation}
                />
              );
            }
          )}
        </ul>
      </section>

      <section className="pb-5">
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px]">
          Fertilizer Application
        </h4>
        <BooleanQuestion
          handleChange={() => null}
          fieldValue={usedFertilizer}
          modalTitle={"Fertilizer"}
          modalDescription={
            "Was commercial fertilizer or manure applied for the analyzed crop?"
          }
          fieldLabel={
            "Did you apply fertilizer (either organic or inorganic source) this crop year?"
          }
        />
        {usedFertilizer && (
          <div
            style={{ height: fertilizersUsed ? "272px" : "0" }}
            className={`transition-all duration-300  w-full  overflow-hidden`}
          >
            <p className="text-[#666666] mb-2">Tractors Used</p>
            {[
              { seedStage: "preSeed", label: "Pre Seed Tractor" },
              { seedStage: "withSeed", label: "Seed Tractor" },
              { seedStage: "postSeed", label: "Post Seed Tractor" },
            ].map((operation, index) => {
              return (
                <li className="flex " key={operation.seedStage}>
                  <DisplayFertilizerTractorField
                    fieldLabel={operation.label}
                    fieldState={
                      cropyearContext.state.fieldOperations
                        .fertilizerApplications[operation.seedStage]
                    }
                  />
                </li>
              );
            })}
          </div>
        )}
      </section>
      {usedFertilizer && (
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
          <ViewMultiChoiceQuestion
            valuesArray={FertilizerTypes}
            stateObject={fertilizersUsed}
          />

          <ul>
            {FertilizerTypes.map((fertilizer, index) => {
              var key = fertilizer.value;

              var isChecked = fertilizersUsed[key];

              if (isChecked)
                return (
                  <li key={key}>
                    <FertilizerTableField
                      onChange={() => null}
                      fertilizerName={fertilizer.label}
                      elementCode={fertilizer.value}
                      fieldState={
                        cropyearContext.state.fieldOperations.fertilizerRates[
                          fertilizer.value
                        ]
                      }
                    />
                  </li>
                );
            })}
          </ul>
        </section>
      )}
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
          onChange={() => null}
        />

        <ul className="transition-all duration-500">
          {cropyearContext.state.fieldOperations.pesticidesApplications.map(
            (pesticideOperation, index) => {
              if (index > numberOfPesticide - 1) return;
              return (
                <ViewFieldOperationMachine
                  key={index}
                  fieldLabel={"Sprayer in Fumigation #" + (index + 1)}
                  fieldState={{
                    ...pesticideOperation,
                    machineObj: farmContext.state.machines.filter(
                      (m) => m._id.$oid === pesticideOperation.machineId
                    )[0],
                  }}
                />
              );
            }
          )}
        </ul>
      </section>
      <LowerPanel
        activeStep={panelControls.activeStep}
        handleBack={panelControls.handleBack}
        handleNext={panelControls.handleNext}
        steps={panelControls.steps}
        handleComplete={panelControls.handleComplete}
        completedSteps={panelControls.completedSteps}
        totalSteps={panelControls.totalSteps}
        isInputValid={() => null}
      />
    </div>
  );
}
