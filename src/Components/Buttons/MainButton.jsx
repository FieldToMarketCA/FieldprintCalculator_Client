import Button from "@mui/material/Button";

export default function MainButton({
  text,
  onClick,
  grow = false,
  secondary = false,
  disabled = false,
}) {
  const backGroundColor = secondary ? "rgb(224,224,224)" : "rgb(241,93,34)";
  const hoverBackGroundColor = secondary
    ? "rgb(210,210,210)"
    : "rgb(211,70,13)";
  const fontColor = secondary ? "#666666" : "rgb(255,255,255)";

  if (disabled) {
    return (
      <Button variant="contained" disabled>
        {text}{" "}
      </Button>
    );
  }
  return (
    <Button
      onClick={onClick}
      variant="contained"
      disabled={disabled}
      sx={{
        backgroundColor: backGroundColor,
        textTransform: "none",
        fontSize: "18px",
        color: fontColor,
        minWidth: "200px",
        "&:hover": {
          backgroundColor: hoverBackGroundColor,
        },
      }}
      className={`px-4  py-[6px]  rounded-sm ${grow && "grow"}`}
    >
      {text}
    </Button>
  );
}
