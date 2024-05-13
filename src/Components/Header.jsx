import ftmcLogo from "../Assets/Images/ftmc_logo.jpg";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";

import { useAuth } from "./Auth/useAuth";

export default function Header({ hideAvatar = false }) {
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
      <div className="h-full content-center">
        <img className="h-5/6 md:h-full" src={ftmcLogo} alt="fmtc logo" />
      </div>
      <div className={"my-auto flex items-center" + hideAvatar && " hidden"}>
        <a href="#">
          <IconButton aria-label="delete" size="large">
            {user ? (
              <Avatar alt="profile picture" src={user.picture} />
            ) : (
              <AccountCircleIcon className="text-white" fontSize="inherit" />
            )}
          </IconButton>
        </a>

        <p className="text-white hidden min-[550px]:block mr-10 text-[18px]">
          Hi, Guest
        </p>
      </div>
    </Paper>
  );
}
