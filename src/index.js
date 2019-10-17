import React from "react";
import { hydrate, render } from "react-dom";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// ReactDOM.render(<App />, document.getElementById("root"));
