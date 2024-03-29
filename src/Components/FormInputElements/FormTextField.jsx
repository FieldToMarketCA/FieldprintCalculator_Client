import HelpIconButton from "../../Components/Buttons/Iconbuttons/HelpIconButton";
import TextField from "@mui/material/TextField";

export default function FormTextField({
  fieldState,
  fieldLabel,
  modalTitle,
  modalDescription,
  onChange,
  isNumber = false,
  onBlur = () => null,
  modalOff = false,
  errorFound = false,
}) {
  return (
    <div className="w-full flex items-center mb-6">
      <TextField
        error={errorFound}
        sx={{ color: "#666666" }}
        id="outlined-basic"
        label={fieldLabel}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        variant="outlined"
        onBlur={(event) => {
          onBlur(event.target.value);
        }}
        value={fieldState}
        type={isNumber ? "number" : "text"}
      />

      {!modalOff && (
        <HelpIconButton title={modalTitle} description={modalDescription} />
      )}
    </div>
  );
}
