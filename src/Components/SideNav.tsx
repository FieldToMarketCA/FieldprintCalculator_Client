import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SideNavCollapseButton from "./Buttons/SideNavButtons/SideNavCollapseButton";
import SideNavButton from "./Buttons/SideNavButtons/SideNavButton";
import { useState } from "react";
import FieldLibraryButton from "./Buttons/SideNavButtons/FieldLibraryButtonREFACTOR";

export default function SideNav() {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (isCollapsed) console.log("yes");
  return (
    <Collapse
      style={{ width: "325px" }}
      // style={{ width: "325px", minWidth: isCollapsed ? "min-w-[325px]" : "" }}
      orientation="horizontal"
      in={isCollapsed}
      collapsedSize={56}
    >
      <div
        style={{ background: "rgb(36, 39, 41)" }}
        className={`w-[325px] h-full flex flex-col`}
      >
        <SideNavButton
          isCollapsed={isCollapsed}
          text={"Dashboard"}
          borderColor="#00ADEE"
          icon={"dashBoardIcon"}
          onClick={() => console.log("Dashboard")}
        />
        <FieldLibraryButton isCollapsed={isCollapsed} />
        <SideNavButton
          isCollapsed={isCollapsed}
          text={"Support"}
          borderColor="rgb(170,170,170)"
          icon={"supportIcon"}
          onClick={() => console.log("suppport")}
        />
        <SideNavCollapseButton
          isCollapsed={isCollapsed}
          onClick={handleCollapse}
        />
      </div>
    </Collapse>
  );
}
