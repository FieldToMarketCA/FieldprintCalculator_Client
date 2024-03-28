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
import FieldLibraryIcon from "../../../Assets/Icons/FieldLibraryIcon";
import DashBoardIcon from "../../../Assets/Icons/DashBoardIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SideNavButton from "./SideNavButton";
import { useNavigate } from "react-router-dom";

export default function SideNavDropDownButton({
  isOpen,
  onClick,
  text,
  icon,
  borderColor = "rgb(170,170,170)",
}: {
  isOpen: boolean;
  text: string;
  onClick: React.MouseEventHandler;
  icon: string;
  borderColor?: string;
}) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  var SelectedIcon: any;

  switch (icon) {
    case "fieldLibraryIcon": {
      SelectedIcon = FieldLibraryIcon;
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
    <div className="flex flex-col">
      <Button
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          position: "relative",
          minHeight: "51px",
          textTransform: "none",
          justifyContent: "flex-start",
          backgroundColor: isHover ? "#4E4E4E" : "",
          borderRadius: "0",
          fontSize: "16px",
        }}
        variant="text"
        color="info"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* BUTTON MAIN CONTENT  */}
        <div className="flex w-full justify-between items-center">
          <div className="flex">
            <SelectedIcon className="ml-4 mr-6" />
            {isOpen && <p>{text} </p>}{" "}
          </div>
          <KeyboardArrowDownIcon
            style={{ color: "#AAAAAA" }}
            className="mr-4"
          />
        </div>
        {/* BOTTOM DIVIDER */}
        <div
          style={{ backgroundColor: borderColor }}
          className={`absolute bottom-0 w-full ${
            isHover ? "h-[3px]" : "h-[1px]"
          } `}
        ></div>
      </Button>

      {/* CHILDREN */}
      {/* <Collapse
        style={{ width: "325px", display: "flex" }}
        orientation="horizontal"
        in={true}
        collapsedSize={100}
      > */}
      {isOpen && (
        <ul className="w-full  pl-4">
          <li className="w-full">
            <SideNavButton
              isOpen={true}
              text="Demo Farm"
              icon={"farmIcon"}
              onClick={() => console.log("x")}
            />
          </li>
          <li className="w-full">
            <SideNavButton
              isOpen={true}
              text="Add Farm"
              icon={"addFarmFieldIcon"}
              onClick={() => navigate("/")}
            />
          </li>
        </ul>
      )}
      {/* </Collapse> */}
    </div>
  );
}
