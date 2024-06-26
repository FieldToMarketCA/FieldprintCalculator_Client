import LinearProgress from "@mui/material/LinearProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function transformString(inputString) {
  // Split the input string on the "_" character
  let tokens = inputString.split("_");

  // Capitalize each token
  let capitalizedTokens = tokens.map(
    (token) => token.charAt(0) + token.slice(1).toLowerCase()
  );

  // Join the tokens back on the space character
  let result = capitalizedTokens.join(" ");

  return result;
}

function TableRow({ row }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-8 text-sm  text-[#666]  hover:bg-[#f9f9f9] font-medium gap-4 border-b-[1px] border-[#DDD] ">
      <div className="col-span-1 underline py-1 px-2 h-[45px] flex items-center">
        {<Link to={`/farm/${row.farmId}`}>{row.farmName}</Link>}
      </div>
      <div className="col-span-1 underline py-1 px-2 h-[45px] flex items-center">
        {
          <Link to={`/farm/${row.farmId}/field/${row.fieldId}`}>
            {row.fieldName}
          </Link>
        }
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        {row.fieldSize}
      </div>
      <div className="col-span-2 py-1 px-2 h-[45px] flex items-center">
        {transformString(row.crop)}
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        {row.cropYear}
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        {row.analysisId ? "Yes" : "No"}
      </div>
      <div className="col-span-1 py-1 px-2 h-[45px] flex items-center">
        <IconButton
          onClick={() =>
            navigate(
              `/farm/${row.farmId}/field/${row.fieldId}/cropyear/${row.cropyearId}`
            )
          }
          aria-label="View Cropyear Details"
          size="medium"
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="medium"
          sx={{
            color: row.analysisId !== false ? "green" : "",
          }}
          onClick={() => {
            if (row.analysisId === false)
              navigate(
                `/farm/${row.farmId}/field/${row.fieldId}/cropyear/${row.cropyearId}/addanalysis`
              );
            else
              navigate(
                `/farm/${row.farmId}/field/${row.fieldId}/cropyear/${row.cropyearId}/analysis`
              );
          }}
        >
          <EqualizerIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

export default function DashboardTable({ tableData, isLoading }) {
  const noDataDefaultRow =
    isLoading === false && tableData.length === 0 ? (
      <p className="my-4">
        There is not enough farm data to display. Try adding a new crop year, or
        clearing the filters.{" "}
      </p>
    ) : null;

  return (
    <div className="w-full overflow-x-scroll">
      <div className="w-full min-w-[750px]">
        {/*  Header */}
        <div className="grid grid-cols-8 text-xs bg-[#EBEBEB] text-[#333] font-bold gap-4">
          <div className="col-span-1 py-1 px-2 h-10 flex items-center">
            Farm
          </div>
          <div className="col-span-1 py-1 px-2 h-10 flex items-center">
            Field
          </div>
          <div className="col-span-1 py-1 px-2 h-10 flex items-center">
            Acres
          </div>
          <div className="col-span-2 py-1 px-2 h-10 flex items-center">
            Crop
          </div>
          <div className="col-span-1 py-1 px-2 h-10 flex items-center">
            Year
          </div>
          <div className="col-span-1 py-1 px-2 h-10 flex items-center">
            Finalized
          </div>
          <div className="col-span-1 py-1 px-2 h-10 flex items-center">
            View
          </div>
        </div>
        {isLoading && <LinearProgress />}
        {/* Body */}
        <ul className="w-full mb-2">
          {tableData.map((row, index) => {
            return (
              <li className="w-full" key={row.cropyearId}>
                <TableRow row={row} />
              </li>
            );
          })}
          <li className="w-full text-center">{noDataDefaultRow}</li>
        </ul>
        <p className="text-[11px] text-[#0000008A]">
          * Fieldprint Data in the Platform has two states - provisional and
          finalized. Until a Field is finalized (options available on the
          Analysis page for a given field), data is provisional and changes can
          be made. Once finalized, Fieldprint Data can be reported. You should
          finalize a Field once all data has been entered, finalized, and
          validated.
        </p>
      </div>
    </div>
  );
}
