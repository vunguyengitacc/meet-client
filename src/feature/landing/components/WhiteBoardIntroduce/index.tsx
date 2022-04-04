import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Box, Button, Typography } from "@mui/material";
import useWhiteBoardIntroduceStyle from "./style";

const WhiteBoardIntroduce = () => {
  const style = useWhiteBoardIntroduceStyle();
  return <Box className={style.surface}></Box>;
};

export default WhiteBoardIntroduce;
