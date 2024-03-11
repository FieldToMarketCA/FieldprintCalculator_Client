import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";
import SupportIcon from "../Assets/Icons/SupportIcon";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  minWidth: 436,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  color: "red",
  borderRadius: 1,
};

function NewTractorModal({ open, handleClose, handleAddNewTractor }) {
  const [newTractorName, setNewTractorName] = useState("");
  const [newTractorHP, setNewTractorHP] = useState(0);
  const [newTractorACHR, setNewTractorACHR] = useState(0);

  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
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
            onClick={() => handleClose(false)}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col w-full px-6  py-5">
          <h3 className="text-lg  font-medium text-[#00abec] mb-4">
            Add a new tractor to your farm <AgricultureIcon />
          </h3>
          <div className="flex flex-col  items-center justify-center">
            <TextField
              id="standard-basic"
              label="Tractor Name"
              variant="standard"
              sx={{ marginBottom: 2 }}
              onChange={(e) => setNewTractorName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Horse Power (HP)"
              sx={{ marginBottom: 2 }}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              variant="standard"
              onChange={(e) => setNewTractorHP(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Default ac/hr"
              variant="standard"
              sx={{ marginBottom: 2 }}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) => setNewTractorACHR(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center">
            <Button
              onClick={() => {
                handleClose(false);
                handleAddNewTractor({
                  type: "TRACTOR",
                  name: newTractorName,
                  HP: newTractorHP,
                  fuelUse: null,
                  defaultAcreHour: newTractorACHR,
                });
              }}
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
              Save
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default NewTractorModal;
