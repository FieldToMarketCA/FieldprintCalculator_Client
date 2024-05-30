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
// Adition Pages
import FarmPage from "./Pages/FarmPage";
import AddFieldPage from "./Pages/AddFieldPage";
import AddCropYear from "./Pages/AddCropYear";
// Edition Pages
import EditFarmPage from "./Pages/EditFarmPage";
import EditFieldPage from "./Pages/EditFieldPage";
import EditCropYear from "./Pages/EditCropYear";
import ReviewPage from "./Pages/ReviewPage";

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
import FieldPage from "./Pages/FieldPage";

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

  const [GUI_STATE, setGUI] = useState({ isNavOpen: false, farms: [] });

  useEffect(() => {
    const getCredentials = async () => {
      if (SECRETS === false) {
        const response = await axios.get(process.env.REACT_APP_API_URL);
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
          value={{
            state: farmState,
            setter: setFarmState,
            resetState: () => {
              setFarmState(FARM_CREATOR());
            },
          }}
        >
          <FieldContext.Provider
            value={{
              state: fieldState,
              setter: setFieldState,
              resetState: () => {
                setFieldState(FIELD_CREATOR());
              },
            }}
          >
            <CropYearContext.Provider
              value={{
                state: cropyearState,
                setter: setCropyearState,
                resetState: () => {
                  setCropyearState(CROPYEAR_CREATOR());
                },
              }}
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
                            element={
                              <ProtectedRoute>
                                <DashBoardPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/farm/:farmId"
                            element={
                              <ProtectedRoute>
                                <FarmPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/farm/:farmId/field/:fieldId"
                            element={
                              <ProtectedRoute>
                                <FieldPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            exact
                            path="/"
                            element={
                              <ProtectedRoute>
                                <DashBoardPage />
                              </ProtectedRoute>
                            }
                          />

                          {/* Addition Routes */}
                          <Route
                            exact
                            path="/addfarm"
                            element={
                              <ProtectedRoute>
                                <AddFarmPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/addfield"
                            element={
                              <ProtectedRoute>
                                <AddFieldPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/addcropyear"
                            element={
                              <ProtectedRoute>
                                <AddCropYear />
                              </ProtectedRoute>
                            }
                          />
                          {/* Edition Routes */}
                          <Route
                            exact
                            path="/editfarm/:farmId"
                            element={
                              <ProtectedRoute>
                                <EditFarmPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/editfield/:fieldId"
                            element={
                              <ProtectedRoute>
                                <EditFieldPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/editcropyear/:cropyearId"
                            element={
                              <ProtectedRoute>
                                <EditCropYear />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/farm/:farmId/field/:fieldId/cropyear/:cropyearId/addanalysis"
                            element={
                              <ProtectedRoute>
                                <ReviewPage />
                              </ProtectedRoute>
                            }
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
