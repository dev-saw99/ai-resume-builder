import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@resume/ui/src/styles.css";
import "@resume/themes/src/styles.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
