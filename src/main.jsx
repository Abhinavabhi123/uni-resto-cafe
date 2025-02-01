import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DishContextProvider } from "./context/dishes.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DishContextProvider>
      <App />
    </DishContextProvider>
  </StrictMode>
);
