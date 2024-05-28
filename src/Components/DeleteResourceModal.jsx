import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";
import SupportIcon from "../Assets/Icons/SupportIcon";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import SecondaryButton from "../Components/Buttons/MainButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  minWidth: 436,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 0,
  color: "#FFF",
  borderRadius: 1,
};

function DeleteResourceModal({
  title,
  description,
  open,
  handleClose,
  handleDelete,
  resourceId,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/*  */}
        <div className="flex items-center justify-center relative bg-[#ff7d32] px-[24px] py-[16px] h-[101px] w-full">
          <ErrorOutlineIcon
            color={"#FFFFFF"}
            sx={{ width: "60px", height: "60px" }}
          />

          {/*  Close Modal Button   */}
          <IconButton
            sx={{ position: "absolute", right: 2, top: 1, color: "#FFFFFF" }}
            onClick={() => handleClose(false)}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col w-full px-6  py-5">
          <h3 className="text-lg  font-medium text-[#ff7d32] mb-4">{title}</h3>
          <p className="font-normal text-[#00000099] mb-6">{description}</p>
          <div className="flex w-full justify-center">
            <Button
              onClick={() => handleDelete(resourceId)}
              variant="contained"
              sx={[
                {
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "#F15D22",
                  textTransform: "none",
                  mr: "3rem",
                },
                (theme) => ({
                  "&:hover": {
                    backgroundColor: "#D3460D",
                  },
                }),
              ]}
            >
              Delete Equipment
            </Button>
            <SecondaryButton
              text={"Do Not Delete"}
              onClick={() => handleClose(false)}
              secondary={true}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteResourceModal;
