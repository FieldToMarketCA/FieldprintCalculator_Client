import ftmcLogo from "../Assets/Images/ftmc_logo.jpg";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
export default function Header() {
  return (
    <Paper
      style={{ backgroundColor: "rgb(241,93,34)", borderRadius: "0" }}
      elevation={3}
      className="flex w-full h-[64px] px-4 md:px-6 justify-between shadow-2xl"
    >
      <div>
        <img className="h-full" src={ftmcLogo} alt="fmtc logo" />
      </div>
      <div className="my-auto flex items-center">
        <IconButton aria-label="delete" size="large">
          <AccountCircleIcon className="text-white" fontSize="inherit" />
        </IconButton>
        <p className="text-white mr-10 text-[18px]">Hi, Leonidas</p>
      </div>
    </Paper>
  );
}
