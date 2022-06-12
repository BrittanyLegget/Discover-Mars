import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Footer from "./Footer";
// pick a date util library
import MomentUtils from "@date-io/moment";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <BrowserRouter>
        <App />
        <Footer />
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
