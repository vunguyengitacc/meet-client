import React, { useEffect, useState } from "react";
import "./App.css";
import MasterRoute from "routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/reduxStore";
import { getMe } from "feature/auth/authSlice";
import theme from "app/muiTheme";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import LoadingPage from "feature/loading";
import useSocket from "hooks/useSocket";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isTryLoad, setIsTryLoad] = useState<boolean>(false);
  useSocket();

  useEffect(() => {
    dispatch(getMe()).then(() => setIsTryLoad(true));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isTryLoad ? <MasterRoute /> : <LoadingPage />}
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            backgroundColor: "gray",
            color: "white",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
