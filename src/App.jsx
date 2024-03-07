// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ComponentGlossary from "./ComponentGlossary";

const theme = createTheme({
  palette: {
    info: {
      main: "#FFFFFF",
    },
    white: {
      main: "#AAAAAA",
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<ComponentGlossary />}>
              <Route exact path="/farm" element={<ComponentGlossary />} />
              <Route path="/field" element={<ComponentGlossary />} />
              <Route path="/cropyear" element={<ComponentGlossary />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
