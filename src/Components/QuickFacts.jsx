import { Collapse } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState } from "react";

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

export default function QuickFacts({ sectionColor }) {
  const [isQuickFactsCollapsed, setIsQuickFactsCollapsed] = useState(true);
  const displayAs = isQuickFactsCollapsed ? "0px" : "145px";

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
        <div class="w-full grid grid-cols-3 gap-4 p-4">
          {QuickFactsDummyData.map((cellData) => {
            return (
              <div>
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

const QuickFactsDummyData = [
  { label: "FPP ID", value: "49570" },
  { label: "Plantable Acres", value: "147.67 acre" },
  { label: "Farm Serial Number", value: null },
  { label: "Last Updated", value: "2/28/2024" },
  { label: "Location", value: "Bingham County, ID" },
  { label: "Tract Number", value: null },
  { label: "Last Updated By", value: "engfelixreynoso@gmail.com" },
  { label: "Crop Management Zone", value: "10" },
  { label: "Field Number", value: null },
];
