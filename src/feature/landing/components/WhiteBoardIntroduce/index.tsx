import React from "react";
import { Box, Typography } from "@mui/material";
import whiteBoardImage from "static/assets/landing/whiteBoard.png";
import useWhiteBoardIntroduceStyle from "./style";

const WhiteBoardIntroduce = () => {
  const style = useWhiteBoardIntroduceStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <Typography
          variant="h3"
          style={{
            fontWeight: 800,
          }}
        >
          White board
        </Typography>
      </Box>
      <Box className={style.content}>
        <Box className={style.introduce}>
          We provide a feature call "White board" that allows you draw anything.
          Besides, you can share your board with others.
        </Box>
        <Box className={style.image}>
          <img width="100%" height="100%" src={whiteBoardImage} />
        </Box>
      </Box>
    </Box>
  );
};

export default WhiteBoardIntroduce;
