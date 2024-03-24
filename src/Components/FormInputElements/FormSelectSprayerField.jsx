import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
import NewMachineModal from "../NewTractorModal";

import { useState } from "react";

export default function FormSelectSprayerField({
  sprayersArray,
  fieldLabel,
  onChange,
  index,
  fieldState,
}) {
  const [isSprayerModalOpen, setIsSprayerModalOpen] = useState(false);

  function handleAddNewSprayer(newSprayer) {
    sprayersArray.push(newSprayer);
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
          handleAddNewTractor={handleAddNewSprayer}
        />
      )}
    </div>
  );
}
