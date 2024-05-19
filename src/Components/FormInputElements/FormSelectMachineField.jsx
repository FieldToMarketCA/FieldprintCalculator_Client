import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
// import NewTractorModal from "../NewTractorModal";
import NewMachineModal from "../NewMachineModal";
import { FarmContext } from "../../App";
import { CropYearContext } from "../../App";
import { useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "../../Components/Auth/useAuth";

export default function FormSelectMachineField({
  machinesArray,
  fieldLabel,
  machineType,
  onChange,
  fieldState,
  errorFound = { machineObj: false, machineHours: false },
}) {
  const { user } = useAuth();

  const farmContext = useContext(FarmContext);
  const cropyearContext = useContext(CropYearContext);

  var farmId = farmContext.state._id.$oid;

  const [selectedMachine, setSelectedMachine] = useState("");
  const [hoursUsed, setHoursUsed] = useState(0);
  const [isMachineModalOpen, setIsMachineModalOpen] = useState(false);

  async function handleAddNewMachine(newMachine) {
    // let farmId = farmContext.state.id;

    const response = await axios.post(
      process.env.REACT_APP_API_URL + `/farms/${farmId}/machines`,
      {
        ...newMachine,
        farmId: farmId,
      },
      {
        headers: {
          token: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );

    farmContext.setter({
      ...farmContext.state,
      machines: [...farmContext.state.machines, response.data.machineObj],
    });

    // After Posting and pushing to the machines array. Now we have to update the cropyearCOntext so that the user
    // doens't have to select from the dropdown again. But after posting, field will be auto populated with the new machine

    const newValue = {};
    newValue["machineObj"] = response.data.machineObj;

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
  }

  return (
    <div className="w-full flex mb-6">
      <TextField
        error={errorFound.machineObj}
        onChange={(t) => onChange(t, machineType, "machineObj")}
        id="outlined-select-currency"
        select
        sx={{ width: "100%", maxWidth: "300px", marginRight: 4 }}
        label={fieldLabel}
        value={fieldState.machineObj}
      >
        {machinesArray.map((machineOption) => (
          <MenuItem key={machineOption.name} value={machineOption}>
            <p>{machineOption.name}</p>
          </MenuItem>
        ))}
        <MenuItem
          key={"addMachine"}
          onClick={() => setIsMachineModalOpen(true)}
        >
          <p>
            Add New{" "}
            {machineType.charAt(0).toUpperCase() +
              machineType.slice(1).toLowerCase()}
          </p>
        </MenuItem>
      </TextField>
      <TextField
        error={errorFound.machineHours}
        onChange={(t) => onChange(t, machineType, "hoursUsed")}
        sx={{ color: "#666666", maxWidth: 130 }}
        label={"Hours Used"}
        InputProps={{ inputProps: { min: 0 } }}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={fieldState.hoursUsed}
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
