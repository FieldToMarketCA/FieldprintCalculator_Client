import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
import NewMachineModal from "../NewMachineModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FarmContext } from "../../App";
import { axiosInstance } from "../axiosFetchers";
import { useAuth } from "../../Components/Auth/useAuth";
import { useState, useContext } from "react";
import dayjs from "dayjs";

export default function FormSelectFertilizerTractorField({
  tractorsArray,
  fieldLabel,
  fieldState,
  onChange,
  seedStage,
}) {
  const farmContext = useContext(FarmContext);
  const { user } = useAuth();
  const [selectedTractor, setSelectedTractor] = useState("");
  const [hoursUsed, setHoursUsed] = useState(0);
  const [isMachineModalOpen, setIsMachineModalOpen] = useState(false);

  async function handleAddNewMachine(newMachine) {
    let farmId = farmContext.state.id;

    const response = await axiosInstance.post(
      process.env.REACT_APP_API_URL + `/machines`,
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
            onClick={() => setIsMachineModalOpen(true)}
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

        {isMachineModalOpen && (
          <NewMachineModal
            machineLabel={"Tractor"}
            machineType={"TRACTOR"}
            open={isMachineModalOpen}
            handleClose={setIsMachineModalOpen}
            handleAddNewMachine={handleAddNewMachine}
          />
        )}
      </div>

      {fieldState.date ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            onChange={(t) => onChange(t, "date", seedStage)}
            label="Date"
            defaultValue={dayjs(fieldState.date)}
          />
        </LocalizationProvider>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            onChange={(t) => onChange(t, "date", seedStage)}
            label="Date"
          />
        </LocalizationProvider>
      )}
    </div>
  );
}
