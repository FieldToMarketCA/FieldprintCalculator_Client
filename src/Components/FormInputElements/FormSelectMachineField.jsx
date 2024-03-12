import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
// import NewTractorModal from "../NewTractorModal";
import NewMachineModal from "../NewMachineModal";

import { useState } from "react";

export default function FormSelectMachineField({
  machinesArray,
  fieldLabel,
  fieldValue,
  machineType,
}) {
  const [selectedMachine, setSelectedMachine] = useState("");
  const [hoursUsed, setHoursUsed] = useState(0);
  const [isMachineModalOpen, setIsMachineModalOpen] = useState(false);

  function handleAddNewMachine(newMachine) {
    machinesArray.push(newMachine);
  }

  return (
    <div className="w-full flex mb-6">
      <TextField
        id="outlined-select-currency"
        select
        sx={{ width: "100%", maxWidth: "300px", marginRight: 4 }}
        label={fieldLabel}
        defaultValue={fieldValue}
      >
        {machinesArray.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            <p>{option.name}</p>
          </MenuItem>
        ))}
        <MenuItem
          key={"addMachine"}
          onClick={() => setIsMachineModalOpen(true)}
          value={""}
        >
          <p>
            Add New{" "}
            {machineType.charAt(0).toUpperCase() +
              machineType.slice(1).toLowerCase()}
          </p>
        </MenuItem>
      </TextField>
      <TextField
        sx={{ color: "#666666", maxWidth: 130 }}
        onChange={(event) => {
          setHoursUsed(event.target.value);
        }}
        label={"Hours Used"}
        InputProps={{ inputProps: { min: 0 } }}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={hoursUsed}
      />

      {isMachineModalOpen && (
        <NewMachineModal
          machineLabel={
            machineType.charAt(0).toUpperCase() +
            machineType.slice(1).toLowerCase()
          }
          machineType={machineType}
          open={isMachineModalOpen}
          handleClose={setIsMachineModalOpen}
          handleAddNewMachine={handleAddNewMachine}
        />
      )}
    </div>
  );
}