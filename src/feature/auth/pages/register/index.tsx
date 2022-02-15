import { Box } from "@mui/material";
import React from "react";
import useRegisterPageStyle from "./style";

const RegisterPage = () => {
  const style = useRegisterPageStyle();
  return <Box className={style.surface}>RegisterPage</Box>;
};

export default RegisterPage;
