import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import { TelegramProvider } from "./context/TelegramContext.jsx";

createRoot(document.getElementById("root")).render(
  <TelegramProvider>
    <App />
  </TelegramProvider>
);
