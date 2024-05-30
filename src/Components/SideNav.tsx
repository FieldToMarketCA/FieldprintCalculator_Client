// import * as React from "react";
// import Box from "@mui/material/Box";
// import Switch from "@mui/material/Switch";
// import Button from "@mui/material/Button";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Collapse from "@mui/material/Collapse";
import SideNavCollapseButton from "./Buttons/SideNavButtons/SideNavCollapseButton";
import SideNavButton from "./Buttons/SideNavButtons/SideNavButton";
import { useState, useContext, useEffect } from "react";
import FieldLibraryButton from "./Buttons/SideNavButtons/FieldLibraryButtonREFACTOR";
import { GUI_CONTEXT } from "../App";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./axiosFetchers";
import { useAuth } from "../Components/Auth/useAuth";

export default function SideNav() {
  // const [isCollapsed, setIsCollapsed] = React.useState(true);
  const { user } = useAuth();
  const GUI = useContext(GUI_CONTEXT);
  const navigate = useNavigate();
  const handleCollapse = () => {
    GUI.setter({ ...GUI.state, isNavOpen: !GUI.state.isNavOpen });
  };

  useEffect(() => {
    async function getFarms() {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/farms`,
        {
          headers: {
            token: "Bearer " + user.token,
            "Content-Type": "application/json",
          },
        }
      );

      GUI.setter({ ...GUI.state, farms: response.data.data });
    }
    getFarms();
  }, []);

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
