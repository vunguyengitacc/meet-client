import { Box } from "@mui/material";
import React from "react";
import useLoginPageStyle from "./style";

const LoginPage = () => {
  const style = useLoginPageStyle();
  return <Box className={style.surface}>LoginPage</Box>;
};

export default LoginPage;
