import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function SideNavCollapseButton({
  isCollapsed,
  onClick,
}: {
  isCollapsed: boolean;
  onClick: React.MouseEventHandler;
}) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Button
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        height: "51px",
        position: "relative",
        textTransform: "none",
        justifyContent: "flex-start",
        fontSize: "16px",
        backgroundColor: isHover ? "#4E4E4E" : "",
        borderRadius: "0",
        color: "#AAAAAA",
      }}
      variant="text"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {!isCollapsed ? (
        <KeyboardArrowRightIcon className="ml-4 mr-6" />
      ) : (
        <KeyboardArrowLeftIcon className="ml-4 mr-6" />
      )}

      {isCollapsed && <p>Collapse Panel </p>}
    </Button>
  );
}
