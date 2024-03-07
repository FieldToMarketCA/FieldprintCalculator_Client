import { IconButton } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";
import HelpModal from "../../HelpModal";
import { useState } from "react";

export default function HelpIconButton({ title, description }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Tooltip title="Help">
        <IconButton
          style={{}}
          size="small"
          aria-label="help"
          onClick={handleOpen}
        >
          <HelpIcon />
        </IconButton>
      </Tooltip>
      <HelpModal
        title={title}
        description={description}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}
