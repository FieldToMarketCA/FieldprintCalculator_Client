// import logo from "./logo.svg";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ComponentGlossary from "./ComponentGlossary";
import AddFarmPage from "./Pages/AddFarmPage";
import AddFieldPage from "./Pages/AddFieldPage";
import AddCropYear from "./Pages/AddCropYear";
import AnalysisPage from "./Pages/AnalysisPage";

import { createContext, useState } from "react";

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

function App() {
  const [farmState, setFarmState] = useState(FARM_CREATOR());
  const [fieldState, setFieldState] = useState(FIELD_CREATOR());
  const [cropyearState, setCropyearState] = useState(CROPYEAR_CREATOR());

  return (
    <ThemeProvider theme={theme}>
      <FarmContext.Provider value={{ state: farmState, setter: setFarmState }}>
        <FieldContext.Provider
          value={{ state: fieldState, setter: setFieldState }}
        >
          <CropYearContext.Provider
            value={{ state: cropyearState, setter: setCropyearState }}
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
          </CropYearContext.Provider>
        </FieldContext.Provider>
      </FarmContext.Provider>
    </ThemeProvider>
  );
}

export { FarmContext, FieldContext, CropYearContext };

export default App;
