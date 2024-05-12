import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function DropdownFilter({ label, values }) {
  return (
    <div className="w-full ">
      <p>{label}</p>
      <TextField
        className="w-full bg-white"
        select
        hiddenLabel
        variant="outlined"
      >
        {values.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default function DashBoardFilterPane({}) {
  const Options = [
    { label: "Farm", values: ["option 1", "option 2", "option 3"] },
    { label: "Field", values: ["option 1", "option 2", "option 3"] },
    { label: "Crop", values: ["option 1", "option 2", "option 3"] },
    { label: "Year", values: ["option 1", "option 2", "option 3"] },
  ];

  return (
    <div className="w-full grid grid-cols-5 gap-4 bg-[#EEEEEE] py-2 px-[16px]">
      {Options.map((option) => (
        <DropdownFilter
          key={option.label}
          label={option.label}
          values={option.values}
        />
      ))}
      <div className="self-end">
        <Button
          sx={{
            color: "#666666",
            border: "solid 1px #666666",
            "&:hover": { border: "solid 1px #666666" },
          }}
          variant="outlined"
        >
          {" "}
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
