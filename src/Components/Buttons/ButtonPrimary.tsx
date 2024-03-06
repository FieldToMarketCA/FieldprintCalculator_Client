import Button from "@mui/material/Button";

type ButtonPrimaryProps = {
  text: string;
  onClick?: () => void;
};

export default function ButtonPrimary({ text, onClick }: ButtonPrimaryProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{
        backgroundColor: "rgb(241,93,34)",
        textTransform: "none",
        fontSize: "18px",
      }}
      className="px-4  py-[6px]  rounded-sm"
    >
      {text}
    </Button>
  );
}
