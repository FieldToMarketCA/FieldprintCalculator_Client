import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SideNavCollapseButton from "./Buttons/SideNavButtons/SideNavCollapseButton";
import SideNavButton from "./Buttons/SideNavButtons/SideNavButton";
import { useState, useContext } from "react";
import FieldLibraryButton from "./Buttons/SideNavButtons/FieldLibraryButtonREFACTOR";
import { GUI_CONTEXT } from "../App";
import { useNavigate } from "react-router-dom";

export default function SideNav() {
  // const [isCollapsed, setIsCollapsed] = React.useState(true);
  const GUI = useContext(GUI_CONTEXT);
  const navigate = useNavigate();
  const handleCollapse = () => {
    GUI.setter({ ...GUI.state, isNavOpen: !GUI.state.isNavOpen });
  };

  return (
    <div className="max-w-[325px] bg-[rgb(36,39,41)]">
      <Collapse
        style={{}}
        orientation="horizontal"
        in={GUI.state.isNavOpen}
        collapsedSize={56}
      >
        <div
          style={{ background: "rgb(36, 39, 41)" }}
          className={`w-[325px] h-full flex flex-col`}
        >
          <SideNavButton
            isOpen={GUI.state.isNavOpen}
            text={"Dashboard"}
            borderColor="#00ADEE"
            icon={"dashBoardIcon"}
            onClick={() => navigate("/dashboard")}
          />

          <FieldLibraryButton isOpen={GUI.state.isNavOpen} />

          <SideNavButton
            isOpen={GUI.state.isNavOpen}
            text={"Support"}
            borderColor="rgb(170,170,170)"
            icon={"supportIcon"}
            onClick={() => console.log("suppport")}
          />

          <SideNavCollapseButton
            isOpen={GUI.state.isNavOpen}
            onClick={handleCollapse}
          />
        </div>
      </Collapse>
    </div>
  );
}
