import { Box } from "@mui/material";
import React from "react";
import AppContent from "./components/AppContent";
import AppHeader from "components/AppHeader";
import useAppFeatureStyle from "./style";

const AppFeature = () => {
  const style = useAppFeatureStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <AppHeader />
      </Box>
      <Box className={style.body}>
        <AppContent />
      </Box>
    </Box>
  );
};

export default AppFeature;
