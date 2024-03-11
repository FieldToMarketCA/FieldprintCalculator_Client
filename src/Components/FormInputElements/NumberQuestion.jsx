import HelpIconButton from "../Buttons/Iconbuttons/HelpIconButton";
import TextField from "@mui/material/TextField";

export default function NumberQuestion({
  min,
  max,
  fieldValue,
  questionText,
  modalTitle,
  modalDescription,
  onChange,
  modalOff = false,
}) {
  return (
    <div className="w-full  flex  mb-6 text-[#666666]">
      <div className="pt-[5px]">
        <p className="font-normal text-[16px] mb-2">{questionText}</p>
        <TextField
          sx={{ color: "#666666" }}
          id="outlined-basic"
          onChange={(event) => {
            onChange(event.target.value);
          }}
          InputProps={{ inputProps: { min: min, max: max } }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={fieldValue}
        />
      </div>
      {!modalOff && (
        <HelpIconButton title={modalTitle} description={modalDescription} />
      )}
    </div>
  );
}
