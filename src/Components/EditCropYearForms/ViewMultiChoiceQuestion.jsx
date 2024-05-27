import FormControlLabel from "@mui/material/FormControlLabel";
import HelpIconButton from "../../Components/Buttons/Iconbuttons/HelpIconButton";
import Checkbox from "@mui/material/Checkbox";

export default function ViewMultiChoiceQuestion({ valuesArray, stateObject }) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className="w-full  flex mb-6 text-[#666666]">
      <div className="pt-[5px]">
        <ul>
          {valuesArray.map((obj, index) => {
            return (
              <FormControlLabel
                key={obj.value}
                control={
                  <Checkbox
                    checked={stateObject[obj.value]}
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
