import { Box } from "@mui/material";
import DrawTool from "feature/white-board/components/DrawTool";
import HeaderDrawTool from "feature/white-board/components/HeaderDrawTool";
import React from "react";
import useWhiteBoardPageStyle from "./style";

const WhiteBoardDetailPage = () => {
  const style = useWhiteBoardPageStyle();
  return (
    <Box>
      <Box className={style.header}>
        <HeaderDrawTool />
      </Box>
      <Box>
        <DrawTool />
      </Box>
    </Box>
  );
};

export default WhiteBoardDetailPage;
