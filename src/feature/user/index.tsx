import { Box } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import useUserFeatureStyle from "./style";

const UserFeature = () => {
  const style = useUserFeatureStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <AppHeader />
      </Box>
      <Box className={style.body}></Box>
    </Box>
  );
};

export default UserFeature;
