import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

// import NewTractorModal from "../NewTractorModal";

// import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
// // import NewTractorModal from "../NewTractorModal";
// import NewMachineModal from "../NewMachineModal";
// import { FarmContext } from "../../App";
// import { CropYearContext } from "../../App";
// import { useState, useContext } from "react";
// import { axiosInstance } from "./axiosFetchers";
// import { useAuth } from "../../Components/Auth/useAuth";

export default function ViewFieldOperationMachine({ fieldLabel, fieldState }) {
  return (
    <div className="w-full flex mb-6">
      <TextField
        id="outlined-select-currency"
        sx={{ width: "100%", maxWidth: "300px", marginRight: 4 }}
        label={fieldLabel}
        value={fieldState.machineObj.name}
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
  );
}
