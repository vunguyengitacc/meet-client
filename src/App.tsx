import React, { useEffect, useState } from "react";
import "./App.css";
import MasterRoute from "routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/reduxStore";
import { getMe } from "feature/auth/authSlice";
import theme from "app/muiTheme";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isTryLoad, setIsTryLoad] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getMe()).then(() => setIsTryLoad(true));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isTryLoad ? <MasterRoute /> : "loading"}
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
      />
    </ThemeProvider>
  );
}

export default App;
