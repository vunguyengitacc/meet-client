import { Switch } from "@mui/material";
import { styled } from "@mui/styles";
import theme from "app/muiTheme";
import React from "react";

const CustomSwitch = styled(Switch)(({ theme: Theme }) => ({
  padding: "5px !important",
  "& .MuiSwitch-track": {
    borderRadius: "5px",
  },
  "& .Mui-checked": {
    "& .MuiSwitch-thumb": {},
    "& + .MuiSwitch-track": {},
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    borderRadius: "5px",
  },
}));

export default CustomSwitch;
