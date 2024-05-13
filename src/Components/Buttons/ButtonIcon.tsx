import Button from "@mui/material/Button";
import CheckIcon from "../../Assets/Icons/CheckIcon";

type ButtonIconProps = {
  text: string;
  Icon: any;
  onClick?: () => void;
  grow?: boolean;
  positionRight?: boolean;
};

export default function ButtonIcon({
  text,

  onClick,
  Icon = CheckIcon,
  grow = false,
  positionRight = false,
}: ButtonIconProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{
        backgroundColor: "rgb(241,93,34)",
        textTransform: "none",
        fontSize: "18px",
        minWidth: "200px",
      }}
      className={`px-4 py-[6px] rounded-sm  ${grow && "grow"}`}
    >
      {!positionRight ? (
        <div className="flex">
          <Icon sx={{ color: "#FFF" }} color="white" className="mt-[5px]" />
          <p className="ml-4 text-white">{text}</p>
        </div>
      ) : (
        <div className="flex">
          <p className="mr-4 text-white">{text}</p>
          <Icon sx={{ color: "#FFF" }} color="white" className="mt-[5px]" />
        </div>
      )}
    </Button>
  );
}
