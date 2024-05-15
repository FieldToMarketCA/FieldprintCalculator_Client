import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";

function TableRow({ row }) {
  return (
    <div className="grid grid-cols-6 text-sm  text-[#666]  hover:bg-[#f9f9f9] font-medium gap-4 border-b-[1px] border-[#DDD]">
      <div className="col-span-1 underline py-1 px-3 h-[45px] flex items-center">
        {/* <Link to={"/addfield"}> */}
        <IconButton disabled sx={{ paddingRight: 0 }}>
          <EditIcon />
          {/* <EditIcon sx={{ color: "#F15D22" }} /> */}
        </IconButton>
        {/* </Link> */}
        <IconButton disabled sx={{ paddingRight: 0 }}>
          <EqualizerIcon />
          {/* <EqualizerIcon sx={{ color: "#F15D22" }} /> */}
        </IconButton>
        <IconButton disabled>
          <DeleteIcon />
          {/* <DeleteIcon sx={{ color: "#F15D22" }} /> */}
        </IconButton>
      </div>

      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.cropYear}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.cropThisYear}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.cropFrequency}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.yieldValue + " " + row.yieldUnits}
      </div>

      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.previousCrop}
      </div>
    </div>
  );
}

export default function CropYearTable({ cropYears }) {
  return (
    <div
      style={{ border: "0.5px solid #DDD" }}
      className="overflow-hidden rounded-md shadow-md mb-4 min-w-[830px]"
    >
      {/*  Header */}
      <div className="grid grid-cols-6 text-xs bg-[#EBEBEB] text-[#333] font-bold gap-4">
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Actions
        </div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">Year</div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">Crop</div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">Yield</div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Frequency
        </div>

        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Previous Crop
        </div>
      </div>

      {/* Body */}
      <ul className="w-full ">
        {cropYears.map((cropyear) => {
          if (typeof cropyear === "object")
            return (
              <li className="w-full" key={cropyear._id.$oid}>
                <TableRow row={cropyear.crop} />
              </li>
            );
        })}
      </ul>
    </div>
  );
}
