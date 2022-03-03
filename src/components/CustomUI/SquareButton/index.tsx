import { Button } from "@mui/material";
import { styled } from "@mui/styles";
import theme from "app/muiTheme";
import React from "react";

const SquareButton = styled(Button)(({ theme: Theme }) => ({
  padding: "5px 5px !important",
  minWidth: "auto !important",
}));

export default SquareButton;
