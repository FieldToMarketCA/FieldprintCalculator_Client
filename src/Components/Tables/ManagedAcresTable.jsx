import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

function TableRow({ row }) {
  return (
    <div className="grid grid-cols-7 text-sm  text-[#666]  hover:bg-[#f9f9f9] font-medium gap-4 border-b-[1px] border-[#DDD]">
      <div className="col-span-1 underline py-1 px-3 h-[45px] flex items-center">
        {
          <Link to={"/addfield"}>
            <IconButton>
              <EditIcon sx={{ color: "#F15D22" }} />
            </IconButton>
          </Link>
        }
      </div>
      <div className="col-span-1 underline py-1 px-3 h-[45px] flex items-center">
        {<Link to={"/dashboard"}>{row.field}</Link>}
      </div>
      <div className="col-span-1 underline py-1 px-3 h-[45px] flex items-center">
        {<Link to={"/dashboard"}>{row.acres}</Link>}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.address}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.tillage}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.previousRegime}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.changeDate}
      </div>
    </div>
  );
}

export default function ManagedAcresTable({}) {
  return (
    <div
      style={{ border: "0.5px solid #DDD" }}
      className="overflow-hidden rounded-md shadow-md mb-4 min-w-[830px]"
    >
      {/*  Header */}
      <div className="grid grid-cols-7 text-xs bg-[#EBEBEB] text-[#333] font-bold gap-4">
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Actions
        </div>

        <div className="col-span-1 py-1 px-3 h-10 flex items-center">Field</div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">Acres</div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Address
        </div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Tillage
        </div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Previous Regime
        </div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Change Date
        </div>
      </div>

      {/* Body */}
      <ul className="w-full ">
        {SampleRowData.map((row) => {
          return (
            <li className="w-full" key={row.farm + row.field}>
              <TableRow row={row} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const SampleRowData = [
  {
    field: "42 Silicon Valley",
    acres: "42",
    address: "Calle Caracol 13",
    tillage: "Zero Till",
    previousRegime: "Minimum Till",
    changeDate: "05/01/2024",
  },
  {
    field: "Adeline's",
    acres: "7",
    address: "Calle 3ra #4",
    tillage: "Zero Till",
    previousRegime: "Minimum Till",
    changeDate: "05/01/2022",
  },
];
