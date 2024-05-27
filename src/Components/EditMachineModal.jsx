import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SupportIcon from "../Assets/Icons/SupportIcon";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField, MenuItem } from "@mui/material";
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

function NewMachineModal({
  open,
  handleClose,
  handleEditMachine,
  machineState,
}) {
  const [newMachineName, setNewMachineName] = useState(machineState.name);
  const [newMachineType, setNewMachineType] = useState(machineState.type);
  const [newMachineHP, setNewMachineHP] = useState(machineState.HP);
  const [newMachineACHR, setNewMachineACHR] = useState(
    machineState.defaultAcreHour
  );

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
            Edit the details of this machine. <AgricultureIcon />
          </h3>
          <div className="flex flex-col  items-center justify-center">
            <TextField
              id="standard-basic"
              label={`Type`}
              variant="standard"
              select
              sx={{ marginBottom: 2, width: "175px" }}
              value={newMachineType}
              onChange={(e) => setNewMachineType(e.target.value)}
            >
              <MenuItem value={"COMBINE"}>COMBINE</MenuItem>
              <MenuItem value={"SWATHER"}>SWATHER</MenuItem>
              <MenuItem value={"TRACTOR"}>TRACTOR</MenuItem>
              <MenuItem value={"SPRAYER"}>SPRAYER</MenuItem>
            </TextField>
            <TextField
              id="standard-basic"
              label={`Name`}
              variant="standard"
              sx={{ marginBottom: 2 }}
              value={newMachineName}
              onChange={(e) => setNewMachineName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Horse Power (HP)"
              sx={{ marginBottom: 2 }}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              variant="standard"
              value={newMachineHP}
              onChange={(e) => setNewMachineHP(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Default ac/hr"
              variant="standard"
              sx={{ marginBottom: 2 }}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={newMachineACHR}
              onChange={(e) => setNewMachineACHR(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center">
            <Button
              onClick={() => {
                handleClose(false);
                handleEditMachine({
                  type: newMachineType,
                  name: newMachineName,
                  HP: newMachineHP,
                  fuelUse: null,
                  defaultAcreHour: newMachineACHR,
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
              Save Changes
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default NewMachineModal;
