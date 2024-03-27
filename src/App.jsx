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
import AddFieldPage from "./Pages/AddFieldPage";
import AddCropYear from "./Pages/AddCropYear";
import AnalysisPage from "./Pages/AnalysisPage";

import { createContext, useEffect, useState } from "react";

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

function App() {
  const [SECRETS, SET_SECRETS] = useState(false);

  const [farmState, setFarmState] = useState(FARM_CREATOR());
  const [fieldState, setFieldState] = useState(FIELD_CREATOR());
  const [cropyearState, setCropyearState] = useState(CROPYEAR_CREATOR());

  const [reportData, setReportData] = useState(false);

  useEffect(() => {
    const getCredentials = async () => {
      if (SECRETS === false) {
        const response = await axios.get(
          "https://fieldprint-calculator-minimal-server.fly.dev/"
        );
        SET_SECRETS(response.data);
        // console.log(response.data.token, response.data.GOOGLE_APIKEY, "lalala");
      }
    };
    getCredentials();
  }, []);

  return (
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
                <div className="App">
                  <HashRouter>
                    <Routes>
                      <Route exact path="/" element={<AddFarmPage />} />
                      {/* <Route exact path="/farm" element={<AddFarmPage />} /> */}

                      {/* </Route> */}
                      <Route path="/field" element={<AddFieldPage />} />
                      <Route path="/cropyear" element={<AddCropYear />} />
                      <Route path="/analysis" element={<AnalysisPage />} />
                    </Routes>
                  </HashRouter>
                </div>
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
};

export default App;
