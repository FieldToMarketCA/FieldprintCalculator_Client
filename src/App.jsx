// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ComponentGlossary from "./ComponentGlossary";
import AddFarmPage from "./Pages/AddFarmPage";
import AddFieldPage from "./Pages/AddFieldPage";
import AddCropYear from "./Pages/AddCropYear";
import AnalysisPage from "./Pages/AnalysisPage";

import { createContext, useContext, useState } from "react";

import { FARM_CREATOR, FIELD_CREATOR } from "./Assets/contextFactories_V0";

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

function App() {
  const [farmState, setFarmState] = useState(FARM_CREATOR());
  const [fieldState, setFieldState] = useState(FIELD_CREATOR());

  return (
    <ThemeProvider theme={theme}>
      <FarmContext.Provider value={{ state: farmState, setter: setFarmState }}>
        <FieldContext.Provider
          value={{ state: fieldState, setter: setFieldState }}
        >
          <div className="App">
            <Router>
              <Routes>
                <Route exact path="/" element={<AddFarmPage />} />
                {/* <Route exact path="/farm" element={<AddFarmPage />} /> */}

                {/* </Route> */}
                <Route path="/field" element={<AddFieldPage />} />
                <Route path="/cropyear" element={<AddCropYear />} />
                <Route path="/analysis" element={<AnalysisPage />} />
              </Routes>
            </Router>
          </div>
        </FieldContext.Provider>
      </FarmContext.Provider>
    </ThemeProvider>
  );
}
export { FarmContext, FieldContext };
export default App;
