import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
import NewTractorModal from "../NewTractorModal";

import { useState } from "react";

export default function FormSelectCultivationTractorField({
  tractorsArray,
  fieldLabel,
  onChange,
  index,
  fieldState,
}) {
  const [selectedTractor, setSelectedTractor] = useState("");
  const [hoursUsed, setHoursUsed] = useState(0);
  const [isTractorModalOpen, setIsTractorModalOpen] = useState(false);

  function handleAddNewTractor(newTractor) {
    tractorsArray.push(newTractor);
  }

  return (
    <div className="w-full flex mb-6">
      <TextField
        id="outlined-select-currency"
        select
        sx={{ width: "100%", maxWidth: "300px", marginRight: 4 }}
        label={fieldLabel}
        onChange={(t) => onChange(t, "machineObj", index)}
        value={fieldState.machineObj}
      >
        {tractorsArray.map((tractorOption) => (
          <MenuItem key={tractorOption.name} value={tractorOption}>
            <p>{tractorOption.name}</p>
          </MenuItem>
        ))}
        <MenuItem
          key={"addTractor"}
          onClick={() => setIsTractorModalOpen(true)}
        >
          <p>Add New Tractor</p>
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