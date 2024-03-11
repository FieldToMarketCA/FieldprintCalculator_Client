import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HelpIconButton from "../../Components/Buttons/Iconbuttons/HelpIconButton";

export default function BooleanQuestion({
  fieldValue,
  fieldLabel,
  modalTitle,
  modalDescription,
  handleChange,
  modalOff = false,
}) {
  return (
    <div className="w-full  flex mb-6 text-[#666666]">
      <div className="pt-[5px]">
        <p>{fieldLabel}</p>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={fieldValue}
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel
            value={true}
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "rgb(241,93,34)",
                  },
                }}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            value={false}
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "rgb(241,93,34)",
                  },
                }}
              />
            }
            label="No"
          />
        </RadioGroup>
      </div>
      {!modalOff && (
        <HelpIconButton title={modalTitle} description={modalDescription} />
      )}
    </div>
  );
}
