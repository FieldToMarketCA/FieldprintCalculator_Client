import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
import NewMachineModal from "../NewTractorModal";

import { useState } from "react";

export default function FormSelectSprayerField({
  sprayersArray,
  fieldLabel,
  fieldValue,
}) {
  const [selectedSprayer, setSelectedSprayer] = useState("");
  const [hoursUsed, setHoursUsed] = useState(0);
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
        label={fieldLabel}
        defaultValue={fieldValue}
      >
        {sprayersArray.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            <p>{option.name}</p>
          </MenuItem>
        ))}
        <MenuItem
          key={"addSprayer"}
          onClick={() => setIsSprayerModalOpen(true)}
          value={""}
        >
          <p>Add New Sprayer</p>
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
