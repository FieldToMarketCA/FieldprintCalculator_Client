import { Divider } from "@mui/material";
import BooleanQuestion from "../FormInputElements/BooleanQuestion";

export default function FieldOperationsForm() {
  return (
    <div className=" w-full h-full">
      <h3 className="text-[rgb(102,102,102)] text-[30px]">Field Operations</h3>
      <Divider sx={{ marginBottom: 3 }} />

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
    </div>
  );
}
