import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import DashboardIcon from "../../../Assets/Icons/DashBoardIcon";
import SupportIcon from "../../../Assets/Icons/SupportIcon";
import FarmIcon from "../../../Assets/Icons/FarmIcon";
import FieldIcon from "../../../Assets/Icons/FieldIcon";
import AddFarmFieldIcon from "../../../Assets/Icons/AddFarmFieldIcon";
import DashBoardIcon from "../../../Assets/Icons/DashBoardIcon";

export default function SideNavButton({
  isOpen,
  onClick,
  text,
  icon,
  borderColor = "rgb(170,170,170)",
  isDisabled = false,
}: {
  isOpen: boolean;
  text: string;
  onClick: React.MouseEventHandler;
  icon: string;
  borderColor?: string;
  isDisabled?: boolean;
}) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  var SelectedIcon: any;

  switch (icon) {
    case "dashBoardIcon": {
      SelectedIcon = DashBoardIcon;
      break;
    }
    case "supportIcon": {
      SelectedIcon = SupportIcon;
      break;
    }
    case "farmIcon": {
      SelectedIcon = FarmIcon;
      break;
    }
    case "fieldIcon": {
      SelectedIcon = FieldIcon;
      break;
    }
    case "addFarmFieldIcon": {
      SelectedIcon = AddFarmFieldIcon;
      break;
    }
  }

  return (
    <Button
      disabled={isDisabled}
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        width: "100%",
        height: "51px",
        position: "relative",
        textTransform: "none",
        justifyContent: "flex-start",
        backgroundColor: isHover ? "#4E4E4E" : "",
        alignItems: "center",
        borderRadius: "0",
        fontSize: "16px",
      }}
      variant="text"
      color="info"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <SelectedIcon className="ml-4 mr-6" />

      {isOpen && <p>{text} </p>}
      <div
        style={{ backgroundColor: borderColor }}
        className={`absolute bottom-0 w-full ${
          isHover ? "h-[3px]" : "h-[1px]"
        } `}
      ></div>
    </Button>
  );
}
