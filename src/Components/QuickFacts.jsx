import { Collapse } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState, useContext } from "react";

import { CropYearContext, FarmContext, FieldContext } from "../App";

function CollapseQuickFactsButton({ color, handleCollapse }) {
  return (
    <button
      style={{ backgroundColor: color }}
      className="rounded-b-full  px-6 pb-1 text-white"
      onClick={handleCollapse}
    >
      <VisibilityOutlinedIcon fontSize="small" /> View Quick Facts
    </button>
  );
}

export default function QuickFacts({ sectionColor, dashboardData = false }) {
  const fieldContext = useContext(FieldContext);
  const farmContext = useContext(FarmContext);
  const cropyearContext = useContext(CropYearContext);

  var QuickFactsDummyData;

  if (dashboardData === false) {
    QuickFactsDummyData = [
      { label: "Farm", value: farmContext.state.name },
      { label: "Partner", value: farmContext.state.partner },
      { label: "Field Size", value: fieldContext.state.fieldSize },

      { label: "Last Updated", value: "" },
      { label: "Address", value: fieldContext.state.fieldAddress },
      { label: "Tract Number", value: null },
      { label: "Last Updated By", value: "membership@fieldtomarket.ca" },
      { label: "Crop", value: cropyearContext.state.crop.cropThisYear },
      { label: "Crop Year", value: cropyearContext.state.crop.cropYear },
    ];
  } else {
    QuickFactsDummyData = dashboardData;
  }

  const [isQuickFactsCollapsed, setIsQuickFactsCollapsed] = useState(true);

  var displayAs;
  if (isQuickFactsCollapsed) {
    displayAs = "0px";
  } else {
    if (dashboardData) displayAs = "95px";
    else {
      displayAs = "145px";
    }
  }

  function handleCollapse() {
    setIsQuickFactsCollapsed(!isQuickFactsCollapsed);
  }

  return (
    <div className="w-full flex flex-col items-center  ">
      <div
        style={{
          borderBottom: `1px solid ${sectionColor}`,
          height: displayAs,
        }}
        className="w-full h-[145px]  transition-all duration-300  overflow-hidden"
      >
        <div className="w-full grid grid-cols-3 gap-4 p-4">
          {QuickFactsDummyData.map((cellData) => {
            return (
              <div key={cellData.label}>
                <p className="text-[#666666]  truncate border-b border-dotted border-[#666666]">
                  <span className="font-bold">{cellData.label}:</span>{" "}
                  <span>{cellData.value}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <CollapseQuickFactsButton
        color={sectionColor}
        handleCollapse={handleCollapse}
      />
    </div>
  );
}
