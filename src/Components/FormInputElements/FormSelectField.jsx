import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../../Components/Buttons/Iconbuttons/HelpIconButton";

export default function FormSelectField({
  valuesArray,
  fieldLabel,
  fieldState,
  helperText,
  modalTitle,
  onChange,
  modalDescription,
  isDisabled = false,
  modalOff = false,
  errorFound = false,
}) {
  return (
    <div className="w-full flex mb-6">
      <TextField
        error={errorFound}
        disabled={isDisabled}
        id="outlined-select-currency"
        select
        sx={{ width: "100%", maxWidth: "300px" }}
        label={fieldLabel}
        value={fieldState}
        helperText={helperText}
        onChange={onChange}
      >
        {valuesArray.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {!modalOff && (
        <div className="mt-3">
          <HelpIconButton title={modalTitle} description={modalDescription} />
        </div>
      )}
    </div>
  );
}
