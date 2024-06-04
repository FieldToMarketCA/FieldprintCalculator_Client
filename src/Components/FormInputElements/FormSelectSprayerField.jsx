// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
// import NewMachineModal from "../NewTractorModal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import NewTractorModal from "../NewTractorModal";

import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
// import NewTractorModal from "../NewTractorModal";
import NewMachineModal from "../NewMachineModal";
import { FarmContext } from "../../App";
import { CropYearContext } from "../../App";
import { useState, useContext } from "react";
import { axiosInstance } from "../axiosFetchers";
import { useAuth } from "../../Components/Auth/useAuth";

export default function FormSelectSprayerField({
  sprayersArray,
  fieldLabel,
  onChange,
  index,
  fieldState,
}) {
  const [isSprayerModalOpen, setIsSprayerModalOpen] = useState(false);
  const farmContext = useContext(FarmContext);
  const cropyearContext = useContext(CropYearContext);
  const { user } = useAuth();

  async function handleAddNewSprayer(newSprayer) {
    let farmId = farmContext.state._id.$oid;

    const response = await axiosInstance.post(
      process.env.REACT_APP_API_URL + `/farms/${farmId}/machines`,
      {
        ...newSprayer,
        type: "SPRAYER",
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
  }

  return (
    <div className="w-full flex mb-6">
      <TextField
        id="outlined-select-currency"
        select
        sx={{ width: "100%", maxWidth: "300px", marginRight: 4 }}
        onChange={(e) => onChange(e, "machineObj", index)}
        label={fieldLabel}
        value={fieldState.machineObj}
      >
        {sprayersArray.map((sprayerOption) => (
          <MenuItem key={sprayerOption.name} value={sprayerOption}>
            <p>{sprayerOption.name}</p>
          </MenuItem>
        ))}
        <MenuItem
          key={"addSprayer"}
          onClick={() => setIsSprayerModalOpen(true)}
        >
          <p>Add New Sprayer</p>
        </MenuItem>
      </TextField>
      <TextField
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

      {isSprayerModalOpen && (
        <NewMachineModal
          open={isSprayerModalOpen}
          handleClose={setIsSprayerModalOpen}
          handleAddNewMachine={handleAddNewSprayer}
          machineType={"SPRAYER"}
          machineLabel={"Sprayer"}
        />
      )}
    </div>
  );
}
