import HelpIconButton from "../../Components/Buttons/Iconbuttons/HelpIconButton";
import TextField from "@mui/material/TextField";

export default function FormTextField({
  fieldValue,
  fieldLabel,
  modalTitle,
  modalDescription,
  onChange,
  modalOff = false,
}) {
  return (
    <div className="w-full flex items-center mb-6">
      <TextField
        sx={{ color: "#666666" }}
        id="outlined-basic"
        label={fieldLabel}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        variant="outlined"
        value={fieldValue}
      />

      {!modalOff && (
        <HelpIconButton title={modalTitle} description={modalDescription} />
      )}
    </div>
  );
}
