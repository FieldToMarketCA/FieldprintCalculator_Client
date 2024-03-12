import Button from "@mui/material/Button";

export default function OutlinedButton({
  text,
  onClick,
  grow = false,
  secondary = false,
  disabled = false,
}) {
  const color = secondary ? "rgb(224,224,224)" : "rgb(241,93,34)";

  if (disabled) {
    return (
      <Button variant="outlined" disabled>
        {text}{" "}
      </Button>
    );
  }
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      disabled={disabled}
      color="mainOrange"
      style={{
        borderColor: color,
        textTransform: "none",
        fontSize: "18px",
        fontWeight: "400",

        padding: "16px 32px",
        width: "100%",
      }}
      className="px-4  py-[6px]  rounded-sm"
    >
      {text}
    </Button>
  );
}
