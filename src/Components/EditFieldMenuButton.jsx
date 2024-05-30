import Button from "@mui/material/Button";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteResourceModal from "./DeleteResourceModal";
import { FarmContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "./axiosFetchers";
import { GUI_CONTEXT } from "../App";
import { useAuth } from "./Auth/useAuth";

export default function EditFieldButton({ text, disabled = false }) {
  const { farmId, fieldId } = useParams();
  const farmContext = React.useContext(FarmContext);
  const GUI = React.useContext(GUI_CONTEXT);
  const [isWarningModalOpen, setIsWarningModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteField = async () => {
    await axiosInstance.delete(
      `${process.env.REACT_APP_API_URL}/farms/${farmId}/fields/${fieldId}`,
      {
        headers: {
          token: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );

    navigate(`/farm/${farmId}`);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (disabled) {
    return (
      <Button variant="contained" disabled>
        {text}{" "}
      </Button>
    );
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        sx={{
          bgcolor: "rgb(241,93,34)",
          "&:hover": {
            backgroundColor: "rgb(211,70,13)",
          },
        }}
      >
        Edit Field
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/editfield/${fieldId}`);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Field</ListItemText>
        </MenuItem>
        <Divider component="li" />
        <MenuItem onClick={() => setIsWarningModalOpen(true)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Field</ListItemText>
        </MenuItem>
      </Menu>
      <DeleteResourceModal
        title={"Delete Field"}
        description={`Are you sure you wish to permanently delete ${farmContext.state.name}?
        
        \nPlease note that deleting your Field deletes all associated crop years and all associated data. This information cannot be recovered. If any crop years are associated with Projects, those associations will also be deleted. In addition, any SAI Platform FSA Equivalency Module surveys completed will be deleted. If you are connected with a Project you may want to confirm with the Project Administrator prior to deleting your farm and fields.

        Are you sure you wish to permanently delete this Field and all associated data?
        `}
        open={isWarningModalOpen}
        handleClose={setIsWarningModalOpen}
        handleDelete={handleDeleteField}
      />
    </div>
  );

  // return (
  //   <Button
  //     onClick={onClick}
  //     variant="contained"
  //     disabled={disabled}
  //     style={{
  //       backgroundColor: backGroundColor,
  //       textTransform: "none",
  //       fontSize: "18px",
  //       color: fontColor,
  //       minWidth: "200px",
  //     }}
  //     className={`px-4  py-[6px]  rounded-sm ${grow && "grow"}`}
  //   >
  //     {text}
  //   </Button>
  // );
}
