import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
import NewMachineModal from "../NewMachineModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FarmContext } from "../../App";
import axios from "axios";
import { useAuth } from "../../Components/Auth/useAuth";
import { useState, useContext } from "react";
import dayjs from "dayjs";

export default function FormSelectFertilizerTractorField({
  fieldLabel,
  fieldState,
}) {
  const farmContext = useContext(FarmContext);

  return (
    <div className="flex jusitify-start w-full">
      <div className="w-[450px] mr-[25px] flex mb-6">
        <TextField
          id="outlined-select-currency"
          sx={{ width: "100%", maxWidth: "300px", marginRight: 4 }}
          label={fieldLabel}
          value={
            farmContext.state.machines.filter(
              (m) => m._id.$oid === fieldState.machineId
            )[0].name
          }
        />

        <TextField
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
      </div>

      {fieldState.date ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            label="Date"
            defaultValue={dayjs(fieldState.date)}
          />
        </LocalizationProvider>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker disableFuture label="Date" />
        </LocalizationProvider>
      )}
    </div>
  );
}
