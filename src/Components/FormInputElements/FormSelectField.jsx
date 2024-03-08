import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HelpIconButton from "../../Components/Buttons/Iconbuttons/HelpIconButton";

export default function FormSelectField({
  valuesArray,
  fieldLabel,
  fieldValue,
  helperText,
  modalTitle,
  modalDescription,
}) {
  return (
    <div className="w-full flex mb-6">
      <TextField
        id="outlined-select-currency"
        select
        sx={{ width: "100%", maxWidth: "300px" }}
        label={fieldLabel}
        defaultValue={fieldValue}
        helperText={helperText}
      >
        {valuesArray.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <div className="mt-3">
        <HelpIconButton title={modalTitle} description={modalDescription} />
      </div>
    </div>
  );
}
