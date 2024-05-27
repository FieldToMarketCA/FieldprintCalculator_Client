import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";
import SupportIcon from "../Assets/Icons/SupportIcon";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

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
  color: "red",
  borderRadius: 1,
};

function DeleteResourceModal({ title, description, open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/*  */}
        <div className="flex items-center justify-center relative bg-[#00abec] px-[24px] py-[16px] h-[101px] w-full">
          <SupportIcon color={"#FFFFFF"} width="60px" height="60px" />

          {/*  Close Modal Button   */}
          <IconButton
            sx={{ position: "absolute", right: 2, top: 1, color: "#FFFFFF" }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col w-full px-6  py-5">
          <h3 className="text-lg  font-medium text-[#00abec] mb-4">{title}</h3>
          <p className="font-normal text-[#00000099] mb-6">{description}</p>
          <div className="flex w-full justify-center">
            <Button
              onClick={handleClose}
              variant="contained"
              sx={[
                {
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "#00abec",
                  textTransform: "none",
                },
                (theme) => ({
                  "&:hover": {
                    backgroundColor: "#006d97",
                  },
                }),
              ]}
            >
              Ok
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default HelpModal;
