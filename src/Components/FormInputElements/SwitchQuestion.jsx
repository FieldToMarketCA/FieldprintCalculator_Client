import Switch from "@mui/material/Switch";

export default function SwitchQuestion({ questionText }) {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div className="w-full flex items-center">
      <p>{questionText}</p>
      <Switch {...label} />
    </div>
  );
}
