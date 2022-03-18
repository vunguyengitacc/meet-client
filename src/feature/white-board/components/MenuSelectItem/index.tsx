import { Box, Typography } from "@mui/material";
import React from "react";
import useMenuSelectItemStyle from "./style";

interface IProps {
  value: string;
  description?: string;
  selected?: boolean;
  startIcon?: React.ReactNode;
  onClick?: (args?: any) => void;
}

const MenuSelectItem: React.FC<IProps> = (props) => {
  const style = useMenuSelectItemStyle();

  return (
    <Box
      className={`${style.surface} ${props.selected && style.selected}`}
      component="div"
      onClick={props.onClick}
    >
      <Box>{props.startIcon}</Box>
      <Box className={style.text}>
        <Typography variant="subtitle2">{props.value}</Typography>
        <Box color="gray" width="150px">
          {props.description}
        </Box>
      </Box>
    </Box>
  );
};

export default MenuSelectItem;
