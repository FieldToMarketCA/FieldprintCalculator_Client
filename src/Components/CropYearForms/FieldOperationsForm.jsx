import { Divider } from "@mui/material";
import BooleanQuestion from "../FormInputElements/BooleanQuestion";
import NumberQuestion from "../FormInputElements/NumberQuestion";
import { useState, useEffect } from "react";
import FormSelectTractorField from "../FormInputElements/FormSelectTractorField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const cultivationOperationType = { machineId: "", hoursOfOperation: 0 };

const TRACTORS = [
  {
    type: "TRACTOR",
    name: "Mate",
    HP: 800,
    fuelUse: null,
    defaultAcreHour: 2,
  },
];

export default function FieldOperationsForm() {
  const [numberOfCultivation, setNumberOfCultivation] = useState(1);
  const [cultivationOperations, setCultivationOperations] = useState([
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
    { ...cultivationOperationType },
  ]);

  useEffect(() => {}, [numberOfCultivation]);

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
              <FormSelectTractorField
                key={cultivation}
                fieldLabel={"Tractor Used in Cultivation #" + (index + 1)}
                tractorsArray={TRACTORS}
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
          fieldValue={0}
          modalTitle={"Fertilizer"}
          modalDescription={
            "Was commercial fertilizer or manure applied for the analyzed crop?"
          }
          fieldLabel={
            "Did you apply fertilizer (either organic or inorganic source) this crop year?"
          }
        />
        <p className="text-[#666666] mb-2">Tractor Used</p>
        <div className="flex jusitify-start">
          <div className="w-[450px] mr-[25px]">
            <FormSelectTractorField
              fieldLabel={"Pre Seed Tractor"}
              tractorsArray={TRACTORS}
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date" />
          </LocalizationProvider>
        </div>
        <div className="flex jusitify-start">
          <div className="w-[450px] mr-[25px]">
            <FormSelectTractorField
              fieldLabel={"Seed Tractor"}
              tractorsArray={TRACTORS}
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date" />
          </LocalizationProvider>
        </div>
        <div className="flex jusitify-start">
          <div className="w-[450px] mr-[25px]">
            <FormSelectTractorField
              fieldLabel={"Post Seed Tractor"}
              tractorsArray={TRACTORS}
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date" />
          </LocalizationProvider>
        </div>
      </section>

      <section className="pb-5">
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px]">
          Fertilizer Rates (lbs/acre)
        </h4>
      </section>
    </div>
  );
}
