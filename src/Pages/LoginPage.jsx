import { useState, useEffect } from "react";
import { useAuth } from "../Components/Auth/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../Components/Header";

import "@fontsource/roboto-slab";
import axios from "axios";
import MainButton from "../Components/Buttons/MainButton";

import Footer from "../Components/Footer";
import GrayButton from "../Components/Buttons/GrayButton";

export const LoginPage = () => {
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // let query = new URL(document.location.toString()).searchParams;
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
          console.log(response.data);
          login(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (user === null) {
      getUser();
    } else {
      // User is already loggedIn
      console.log(user);
    }
  }, []);

  return (
    <div className="w-screen relative text-lg  text-[#666] h-screen overflow-scroll">
      <div className="w-full mb-20">
        <Header />
      </div>
      {/* <a
        href={process.env.REACT_APP_API_URL + "/login/google"}
        className="p-8 bg-red-500"
        type="submit"
      >
        Login
      </a> */}

      <div className="w-full overflow-scroll">
        <div className="max-w-[706px] mx-auto px-4 pb-20">
          <h1
            style={{
              fontFamily: "Roboto Slab",
              fontSize: "30px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "black",
            }}
          >
            Welcome!
          </h1>

          <p className="mb-6">
            The Fieldprint
            <sup>
              <span>&#174;</span>{" "}
            </sup>
            Platform is a pioneering assessment framework that empowers brands,
            retailers, suppliers and farmers at every stage in their
            sustainability journey, to measure the environmental impacts of
            commodity crop production and identify opportunities for continuous
            improvement.
          </p>

          <div className="p-5 bg-[#F5F5F5]">
            <h2
              style={{
                fontFamily: "Roboto Slab",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "16px",
                color: "black",
              }}
            >
              Get Started
            </h2>
            <p className="mb-6">
              Use of the Calculator is free and data is kept confidential.
              Login, register for an account or explore the features as a guest.
              By Continuing with any of these options, you agree to the{" "}
              <span className="text-[#FF7D32] underline">Terms of Use</span>.
            </p>

            <div className="w-full flex mb-6">
              {user === null ? (
                <a
                  href={process.env.REACT_APP_API_URL + "/login/google"}
                  type="submit"
                  className="flex w-full"
                >
                  <MainButton
                    text={"Login with Google"}
                    onClick={console.log}
                    grow={true}
                  />
                </a>
              ) : (
                <div className="w-full">
                  <p
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "20px",
                      color: "black",
                    }}
                  >
                    Welcome Back {user.name}!
                  </p>
                  <div className="w-full flex justify-between">
                    <MainButton
                      text={"Continue to Calculator"}
                      onClick={() => navigate("/dashboard")}
                    />
                    <GrayButton text={"Logout"} onClick={logout} />
                  </div>
                </div>
              )}
            </div>

            <p>
              Need Help? Visit the{" "}
              <span className="text-[#FF7D32] underline">Support Portal</span>{" "}
              or contact us at{" "}
              <span className="text-[#FF7D32] underline">
                support@fieldtomarket.ca
              </span>
              . Password reset is available from the login page.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
};
