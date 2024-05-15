import VisibilityIcon from "@mui/icons-material/Visibility";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function TableRow({ row }) {
  return (
    <div className="grid grid-cols-7 text-sm  text-[#666]  hover:bg-[#f9f9f9] font-medium gap-4 border-b-[1px] border-[#DDD]">
      <div className="col-span-1 underline py-1 px-2 h-[45px] flex items-center">
        {<Link to={"/dashboard"}>{row.farmName}</Link>}
      </div>
      <div className="col-span-1 underline py-1 px-2 h-[45px] flex items-center">
        {<Link to={"/dashboard"}>{row.fieldName}</Link>}
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        {row.fieldSize}
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        {row.crop}
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        {row.cropYear}
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        {row.finalized ? "Yes" : "No"}
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        <IconButton
          // disabled={!row.finalized}
          disabled
          sx={{ color: "rgb(241, 93, 34)" }}
          aria-label="View Cropyear Details"
          size="medium"
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          // disabled={!row.finalized}
          disabled
          aria-label="delete"
          size="medium"
          // sx={{ color: row.view.analytics ? "green" : "rgb(241, 93, 34)" }}
        >
          <EqualizerIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

export default function DashboardTable({ tableData }) {
  return (
    <div>
      {/*  Header */}
      <div className="grid grid-cols-7 text-xs bg-[#EBEBEB] text-[#333] font-bold gap-4">
        <div className="col-span-1 py-1 px-2 h-10 flex items-center">Farm</div>
        <div className="col-span-1 py-1 px-2 h-10 flex items-center">Field</div>
        <div className="col-span-1 py-1 px-2 h-10 flex items-center">Acres</div>
        <div className="col-span-1 py-1 px-2 h-10 flex items-center">Year</div>
        <div className="col-span-1 py-1 px-2 h-10 flex items-center">Crop</div>
        <div className="col-span-1 py-1 px-2 h-10 flex items-center">
          Finalized
        </div>
        <div className="col-span-1 py-1 px-2 h-10 flex items-center">View</div>
      </div>

      {/* Body */}
      <ul className="w-full mb-2">
        {tableData.map((row, index) => {
          return (
            <li className="w-full" key={row.id + index}>
              <TableRow row={row} />
            </li>
          );
        })}
      </ul>
      <p className="text-[11px] text-[#0000008A]">
        * Fieldprint Data in the Platform has two states - provisional and
        finalized. Until a Field is finalized (options available on the Analysis
        page for a given field), data is provisional and changes can be made.
        Once finalized, Fieldprint Data can be reported. You should finalize a
        Field once all data has been entered, finalized, and validated.
      </p>
    </div>
  );
}
