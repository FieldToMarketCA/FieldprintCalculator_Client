import { useState, useEffect } from "react";
import { useAuth } from "../Components/Auth/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";

export const LoginPage = () => {
  const { login, user } = useAuth();

  useEffect(() => {
    let query = new URL(document.location.toString()).searchParams;
    var token = null;

    const url = document.location.toString();

    if (url.includes("token")) {
      token = document.location.toString().split("token=")[1];
    }

    async function getUser() {
      try {
        if (token) {
          const response = await axios.get(
            process.env.REACT_APP_API_URL + "/authenticate",
            { params: { token: token } }
          );

          login(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (user === null) {
      getUser();
    }
  }, []);

  return (
    <div>
      <a
        href={process.env.REACT_APP_API_URL + "/login/google"}
        className="p-8 bg-red-500"
        type="submit"
      >
        Login
      </a>
    </div>
  );
};
