import { Switch } from "@mui/material";
import { styled } from "@mui/styles";
import theme from "app/muiTheme";
import React from "react";

export const CustomSwitch = styled(Switch)(({ theme: Theme }) => ({
  "& .MuiSwitch-root": {
    padding: 0,
  },
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundColor: "#078907",
        borderRadius: "50%",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="24" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#078907",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "gray",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      //   backgroundImage: `url('data:image/svg+xml;utf8,<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      //   viewBox="0 0 240 240" style="enable-background:new 0 0 240 240;" xml:space="preserve">
      //         <path d="M120,240c66.168,0,120-53.831,120-120S186.168,0,120,0S0,53.832,0,120S53.832,240,120,240z M120,30
      //         c49.626,0,90,40.374,90,90s-40.374,90-90,90s-90-40.374-90-90S70.374,30,120,30z M69.144,149.644L98.787,120L69.144,90.356
      //         l21.213-21.213L120,98.787l29.644-29.644l21.213,21.213L141.213,120l29.643,29.644l-21.213,21.213L120,141.213l-29.644,29.643
      //         L69.144,149.644z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
