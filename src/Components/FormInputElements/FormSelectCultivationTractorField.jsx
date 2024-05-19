import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import NewTractorModal from "../NewTractorModal";

import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
// import NewTractorModal from "../NewTractorModal";
import NewMachineModal from "../NewMachineModal";
import { FarmContext } from "../../App";
import { CropYearContext } from "../../App";
import { useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "../../Components/Auth/useAuth";

export default function FormSelectCultivationTractorField({
  tractorsArray,
  fieldLabel,
  onChange,
  index,
  fieldState,
  errorFound = { machineObj: false, machineHours: false },
}) {
  const [isTractorModalOpen, setIsTractorModalOpen] = useState(false);
  const farmContext = useContext(FarmContext);
  const cropyearContext = useContext(CropYearContext);
  const { user } = useAuth();

  async function handleAddNewTractor(newTractor) {
    let farmId = farmContext.state._id.$oid;

    const response = await axios.post(
      process.env.REACT_APP_API_URL + `/farms/${farmId}/machines`,
      {
        ...newTractor,
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
  }

  return (
    <div className="w-full flex mb-6">
      <TextField
        error={errorFound.machineObj}
        id="outlined-select-currency"
        select
        sx={{ width: "100%", maxWidth: "300px", marginRight: 4 }}
        label={fieldLabel}
        onChange={(t) => onChange(t, "machineObj", index)}
        value={fieldState.machineObj}
      >
        {tractorsArray.map((tractorOption) => {
          return (
            <MenuItem key={tractorOption.name} value={tractorOption}>
              <p>{tractorOption.name}</p>
            </MenuItem>
          );
        })}
        <MenuItem
          key={"addTractor"}
          onClick={() => setIsTractorModalOpen(true)}
        >
          <p>Add New Tractor</p>
        </MenuItem>
      </TextField>
      <TextField
        error={errorFound.machineHours}
        sx={{ color: "#666666", maxWidth: 130 }}
        onChange={(t) => onChange(t, "hoursUsed", index)}
        label={"Hours Used"}
        InputProps={{ inputProps: { min: 0 } }}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={fieldState.hoursUsed}
      />

      {isTractorModalOpen && (
        <NewTractorModal
          open={isTractorModalOpen}
          handleClose={setIsTractorModalOpen}
          handleAddNewTractor={handleAddNewTractor}
        />
      )}
    </div>
  );
}
