import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
import NewTractorModal from "../NewTractorModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useState } from "react";

export default function FormSelectFertilizerTractorField({
  tractorsArray,
  fieldLabel,
  fieldState,
  onChange,
  seedStage,
}) {
  const [selectedTractor, setSelectedTractor] = useState("");
  const [hoursUsed, setHoursUsed] = useState(0);
  const [isTractorModalOpen, setIsTractorModalOpen] = useState(false);

  function handleAddNewTractor(newTractor) {
    tractorsArray.push(newTractor);
  }

  return (
    <div className="flex jusitify-start w-full">
      <div className="w-[450px] mr-[25px] flex mb-6">
        <TextField
          id="outlined-select-currency"
          select
          sx={{ width: "100%", maxWidth: "300px", marginRight: 4 }}
          label={fieldLabel}
          value={fieldState.machineObj}
          onChange={(t) => onChange(t, "machineObj", seedStage)}
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
          onChange={(t) => onChange(t, "hoursUsed", seedStage)}
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={(t) => onChange(t, "date", seedStage)}
          label="Date"
          value={fieldState.date}
        />
      </LocalizationProvider>
    </div>
  );
}
