import React from "react";
import { hydrate, render } from "react-dom";
import App from "./App";
import "./reset.css";
import "./vars.css";
import "./colors.css";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
