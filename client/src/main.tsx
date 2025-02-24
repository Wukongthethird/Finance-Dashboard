import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/state/api";

export const store = configureStore({
  //reduce api query into the reducer
  reducer: { [api.reducerPath]: api.reducer },

  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
