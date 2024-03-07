import HelpIconButton from "../../Components/Buttons/Iconbuttons/HelpIconButton";
import TextField from "@mui/material/TextField";

export default function FormTextField({
  fieldValue,
  fieldLabel,
  modalTitle,
  modalDescription,
}) {
  return (
    <div className="w-full flex items-center mb-6">
      <TextField
        sx={{ color: "#666666" }}
        id="outlined-basic"
        label={fieldLabel}
        variant="outlined"
        value={fieldValue}
      />
      <HelpIconButton title={modalTitle} description={modalDescription} />
    </div>
  );
}
