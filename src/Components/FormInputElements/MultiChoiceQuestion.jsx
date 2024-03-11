import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HelpIconButton from "../../Components/Buttons/Iconbuttons/HelpIconButton";
import Checkbox from "@mui/material/Checkbox";

export default function MultiChoiceQuestion({
  valuesArray,
  questionText,
  modalTitle,
  modalDescription,
  handleCheckmark,
  modalOff = false,
}) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className="w-full  flex mb-6 text-[#666666]">
      <div className="pt-[5px]">
        <div className="flex">
          <p className="pt-1">{questionText}</p>{" "}
          {!modalOff && (
            <HelpIconButton title={modalTitle} description={modalDescription} />
          )}
        </div>
        <ul>
          {valuesArray.map((obj, index) => {
            return (
              <FormControlLabel
                key={obj.value}
                control={
                  <Checkbox
                    onChange={(e) => handleCheckmark(e, obj.value)}
                    sx={{
                      "&.Mui-checked": {
                        color: "rgb(241,93,34)",
                      },
                    }}
                  />
                }
                label={obj.label}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
