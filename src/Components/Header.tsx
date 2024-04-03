import ftmcLogo from "../Assets/Images/ftmc_logo.jpg";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
export default function Header() {
  return (
    <Paper
      style={{ backgroundColor: "rgb(241,93,34)", borderRadius: "0" }}
      elevation={3}
      className="flex w-full h-[64px] px-4 md:px-6 justify-between shadow-2xl z-50"
    >
      <div className="h-full content-center">
        <img className="h-5/6 md:h-full" src={ftmcLogo} alt="fmtc logo" />
      </div>
      <div className="my-auto flex items-center">
        <IconButton aria-label="delete" size="large">
          <AccountCircleIcon className="text-white" fontSize="inherit" />
        </IconButton>
        <p className="text-white hidden min-[550px]:block mr-10 text-[18px]">
          Hi, Guest
        </p>
      </div>
    </Paper>
  );
}