import TextField from "@mui/material/TextField";

export default function FertilizerTableFiled({
  fertilizerName,
  onChange,
  elementCode,
}) {
  return (
    <div className="w-fit mb-4 bg-[rgb(240,240,240)] rounded p-4 pt-1">
      <p className="font-medium text-[#666666]">{fertilizerName}</p>
      <div className="w-full">
        <TextField
          sx={{ mr: 4 }}
          id="standard-basic"
          label="Pre Seed"
          variant="standard"
          onChange={(event) => {
            onChange(event.target.value, elementCode, "preSeed");
          }}
        />
        <TextField
          sx={{ mr: 4 }}
          id="standard-basic"
          label="With Seed"
          variant="standard"
          onChange={(event) => {
            onChange(event.target.value, elementCode, "withSeed");
          }}
        />
        <TextField
          id="standard-basic"
          label="Post Seed"
          variant="standard"
          onChange={(event) => {
            onChange(event.target.value, elementCode, "postSeed");
          }}
        />
      </div>
    </div>
  );
}
