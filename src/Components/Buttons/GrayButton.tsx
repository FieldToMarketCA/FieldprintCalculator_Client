import Button from "@mui/material/Button";

type GrayButtonProps = {
  text: string;
  onClick?: () => void;
  grow?: boolean;
};

export default function GrayButton({
  text,
  onClick,
  grow = false,
}: GrayButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{
        backgroundColor: "rgb(96, 96, 96)",
        textTransform: "none",
        fontSize: "18px",
        minWidth: "200px",
      }}
      className="px-4  py-[6px]  rounded-sm"
    >
      {text}
    </Button>
  );
}
