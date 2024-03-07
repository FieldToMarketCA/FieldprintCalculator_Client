import Button from "@mui/material/Button";

type MainButtonProps = {
  text: string;
  onClick?: () => void;
  grow?: boolean;
  secondary?: boolean;
};

export default function MainButton({
  text,
  onClick,
  grow = false,
  secondary = false,
}: MainButtonProps) {
  const backGroundColor = secondary ? "rgb(224,224,224)" : "rgb(241,93,34)";
  const fontColor = secondary ? "#666666" : "rgb(255,255,255)";
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{
        backgroundColor: backGroundColor,
        textTransform: "none",
        fontSize: "18px",
        color: fontColor,
        minWidth: "200px",
      }}
      className="px-4  py-[6px]  rounded-sm"
    >
      {text}
    </Button>
  );
}
