import { Box } from "@mui/material";
import DrawBox from "feature/white-board/components/DrawBox";
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
        <DrawBox />
      </Box>
    </Box>
  );
};

export default WhiteBoardDetailPage;
