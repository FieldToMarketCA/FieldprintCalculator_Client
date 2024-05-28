import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteResourceModal from "../DeleteResourceModal";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { FieldContext } from "../../App";
import { useAuth } from "../Auth/useAuth";
import axios from "axios";

function TableRow({ row }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fieldContext = useContext(FieldContext);
  const { farmId, fieldId } = useParams();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  async function handleDeleteCropYear() {
    console.log(fieldContext.state.cropYears);
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/farms/${farmId}/fields/${fieldId}/cropyears/${row.cropyearId}`,
      {
        headers: {
          token: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );
    let filteredCropYears = fieldContext.state.cropYears.filter(
      (cropYear) => cropYear._id.$oid !== row.cropyearId
    );

    fieldContext.setter({
      ...fieldContext.state,
      cropYears: filteredCropYears,
    });
  }

  return (
    <div className="grid grid-cols-6 text-sm  text-[#666]  hover:bg-[#f9f9f9] font-medium gap-4 border-b-[1px] border-[#DDD]">
      <div className="col-span-1 underline py-1 px-3 h-[45px] flex items-center">
        {/* <Link to={"/addfield"}> */}
        <IconButton
          onClick={() => navigate(`/editcropyear/${row.cropyearId}`)}
          sx={{ paddingRight: 0 }}
        >
          <VisibilityIcon />
          {/* <EditIcon sx={{ color: "#F15D22" }} /> */}
        </IconButton>
        {/* </Link> */}
        <IconButton disabled sx={{ paddingRight: 0 }}>
          <EqualizerIcon />
          {/* <EqualizerIcon sx={{ color: "#F15D22" }} /> */}
        </IconButton>
        <IconButton onClick={() => setIsWarningModalOpen(true)}>
          <DeleteIcon />
          {/* <DeleteIcon sx={{ color: "#F15D22" }} /> */}
        </IconButton>
        <DeleteResourceModal
          title={"Delete Crop Year"}
          description={`Are you sure you wish to permanently delete ${row.cropYear} ${row.cropThisYear}?
        
        \nPlease note that deleting your farm deletes all associated fields and crop years and all associated data. This information cannot be recovered. If any crop years are associated with Projects, those associations will also be deleted. In addition, any SAI Platform FSA Equivalency Module surveys completed will be deleted. If you are connected with a Project you may want to confirm with the Project Administrator prior to deleting your farm and fields.

        Are you sure you wish to permanently delete this farm and all associated data?
        `}
          open={isWarningModalOpen}
          handleClose={setIsWarningModalOpen}
          handleDelete={handleDeleteCropYear}
        />
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
                <TableRow
                  row={{ ...cropyear.crop, cropyearId: cropyear._id.$oid }}
                />
              </li>
            );
        })}
      </ul>
    </div>
  );
}
