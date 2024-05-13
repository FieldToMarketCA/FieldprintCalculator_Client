// import logo from "./logo.svg";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import axios from "axios";
import ComponentGlossary from "./ComponentGlossary";
import AddFarmPage from "./Pages/AddFarmPage";
import FarmPage from "./Pages/FarmPage";
import AddFieldPage from "./Pages/AddFieldPage";
import AddCropYear from "./Pages/AddCropYear";
import AnalysisPage from "./Pages/AnalysisPage";
import DashBoardPage from "./Pages/DashBoardPage";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useEffect, useState } from "react";

// Auth Imports
import { LoginPage } from "./Pages/LoginPage.jsx";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";
import { AuthProvider } from "./Components/Auth/useAuth";

import {
  FARM_CREATOR,
  FIELD_CREATOR,
  CROPYEAR_CREATOR,
} from "./Assets/contextFactories_V0";

const theme = createTheme({
  palette: {
    info: {
      main: "#FFFFFF",
    },
    white: {
      main: "#AAAAAA",
    },
    mainOrange: {
      main: "rgb(241,93,34)",
    },
  },
  typography: {
    fontFamily: [
      "Source Sans Pro",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const FarmContext = createContext();
const FieldContext = createContext();
const CropYearContext = createContext();

const SECRETS_CONTEXT = createContext();

const ReportDataContext = createContext();

const GUI_CONTEXT = createContext();

function App() {
  const [SECRETS, SET_SECRETS] = useState(false);

  const [farmState, setFarmState] = useState(FARM_CREATOR());
  const [fieldState, setFieldState] = useState(FIELD_CREATOR());
  const [cropyearState, setCropyearState] = useState(CROPYEAR_CREATOR());

  const [reportData, setReportData] = useState(false);

  const [GUI_STATE, setGUI] = useState({ isNavOpen: false });

  useEffect(() => {
    const getCredentials = async () => {
      if (SECRETS === false) {
        const response = await axios.get(
          "https://fieldprint-calculator-minimal-server.fly.dev/"
        );
        SET_SECRETS(response.data);
      }
    };
    getCredentials();
  }, []);

  return (
    // <GoogleOAuthProvider clientId="820303429606-cgalocai2uava757at1m2ls2b1c4q5bh.apps.googleusercontent.com">
    <ThemeProvider theme={theme}>
      <SECRETS_CONTEXT.Provider value={{ SECRETS: SECRETS }}>
        <FarmContext.Provider
          value={{ state: farmState, setter: setFarmState }}
        >
          <FieldContext.Provider
            value={{ state: fieldState, setter: setFieldState }}
          >
            <CropYearContext.Provider
              value={{ state: cropyearState, setter: setCropyearState }}
            >
              <ReportDataContext.Provider
                value={{ state: reportData, setter: setReportData }}
              >
                <GUI_CONTEXT.Provider
                  value={{ state: GUI_STATE, setter: setGUI }}
                >
                  <div className="App">
                    <HashRouter>
                      <AuthProvider>
                        <Routes>
                          <Route path="/login" element={<LoginPage />} />
                          <Route
                            path="/dashboard"
                            element={<DashBoardPage />}
                          />
                          <Route path="/farm" element={<FarmPage />} />

                          <Route
                            exact
                            path="/"
                            element={
                              <ProtectedRoute>
                                <AnalysisPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            exact
                            path="/addfarm"
                            element={<AddFarmPage />}
                          />

                          {/* </Route> */}
                          <Route path="/addfield" element={<AddFieldPage />} />
                          <Route
                            path="/addcropyear"
                            element={<AddCropYear />}
                          />

                          <Route
                            path="/analysis"
                            element={
                              <ProtectedRoute>
                                <AnalysisPage />
                              </ProtectedRoute>
                            }
                          />
                        </Routes>
                      </AuthProvider>
                    </HashRouter>
                  </div>
                </GUI_CONTEXT.Provider>
              </ReportDataContext.Provider>
            </CropYearContext.Provider>
          </FieldContext.Provider>
        </FarmContext.Provider>
      </SECRETS_CONTEXT.Provider>
    </ThemeProvider>
  );
}

export {
  FarmContext,
  FieldContext,
  CropYearContext,
  SECRETS_CONTEXT,
  ReportDataContext,
  GUI_CONTEXT,
};

export default App;
