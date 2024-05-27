import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

function TableRow({ row }) {
  return (
    <div className="grid grid-cols-5 text-sm  text-[#666]  hover:bg-[#f9f9f9] font-medium gap-4 border-b-[1px] border-[#DDD]">
      <div className="col-span-1 underline py-1 px-3 h-[45px] flex items-center">
        <IconButton disabled>
          <EditIcon />
        </IconButton>
        <IconButton disabled>
          <DeleteIcon />
        </IconButton>
      </div>

      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.type.charAt(0).toUpperCase() + row.type.slice(1).toLowerCase()}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.name}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.HP}
      </div>
      <div className="col-span-1 py-1 px-3 h-[45px] flex items-center">
        {row.defaultAcreHour}
      </div>
    </div>
  );
}

export default function MachinesTable({ machines }) {
  return (
    <div
      style={{ border: "0.5px solid #DDD" }}
      className="overflow-hidden rounded-md shadow-md mb-4 min-w-[830px]"
    >
      {/*  Header */}
      <div className="grid grid-cols-5 text-xs bg-[#EBEBEB] text-[#333] font-bold gap-4">
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Actions
        </div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">Type</div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">Name</div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">HP</div>
        <div className="col-span-1 py-1 px-3 h-10 flex items-center">
          Acre/Hr
        </div>
      </div>

      {/* Body */}
      <ul className="w-full ">
        {machines.map((row) => {
          if (typeof row === "object")
            return (
              <li className="w-full" key={row._id.$oid}>
                <TableRow row={row} />
              </li>
            );
        })}
      </ul>
    </div>
  );
}
