import ftmcLogo from "../Assets/Images/ftmc_logo.jpg";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Avatar } from "@mui/material";

import { useAuth } from "./Auth/useAuth";

export default function Header({ hideAvatar = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // const [user, setUser] = useState(false);

  // useEffect(() => {
  //   async function getUser() {
  //     let query = new URL(document.location.toString()).searchParams;

  //     try {
  //       if (query.get("token")) {
  //         const response = await axios.get(
  //           "http://127.0.0.1:8000/authenticate",
  //           { params: { token: query.get("token") } }
  //         );

  //         setUser(response.data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   getUser();
  // }, []);

  return (
    <Paper
      style={{ backgroundColor: "rgb(241,93,34)", borderRadius: "0" }}
      elevation={3}
      className="flex w-full h-[64px] px-4 md:px-6 justify-between shadow-2xl z-50"
    >
      <Link to="/dashboard">
        <div className="h-full content-center">
          <img className="h-5/6 md:h-full" src={ftmcLogo} alt="fmtc logo" />
        </div>
      </Link>
      <div className={`my-auto flex items-center ${hideAvatar && "hidden"}`}>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => navigate("/login")}
        >
          {user !== null ? (
            <Avatar alt="profile picture" src={user.picture} />
          ) : (
            <AccountCircleIcon className="text-white" fontSize="inherit" />
          )}
        </IconButton>

        <p className="text-white hidden min-[550px]:block mr-10 text-[18px]">
          {user !== null ? `Hi, ${user.name}` : "Hi, Guest"}
        </p>
      </div>
    </Paper>
  );
}
