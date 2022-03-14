import { Box } from "@mui/material";
import SquareButton from "components/CustomUI/SquareButton";
import React from "react";
import useDrawControlStyle from "./style";
import TextFormatOutlinedIcon from "@mui/icons-material/TextFormatOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { DrawType } from "utilities/drawUtil";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

interface IProps {
  setAction: (input: DrawType) => void;
  action: DrawType;
}

const DrawControl: React.FC<IProps> = ({ action, setAction }) => {
  const style = useDrawControlStyle();

  const getBtnType = (condition: DrawType) => {
    return action === condition ? "contained" : "text";
  };

  const switchActionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    let newAction = e.currentTarget.value as DrawType;
    setAction(newAction);
  };

  return (
    <Box className={style.surface}>
      <SquareButton
        value={DrawType.NONE}
        variant={getBtnType(DrawType.NONE)}
        onClick={switchActionHandler}
        disableElevation
      >
        <ArrowForwardOutlinedIcon style={{ transform: "rotate(225deg)" }} />
      </SquareButton>
      <SquareButton
        value={DrawType.PEN}
        variant={getBtnType(DrawType.PEN)}
        onClick={switchActionHandler}
        disableElevation
      >
        <DriveFileRenameOutlineIcon />
      </SquareButton>
      <SquareButton
        value={DrawType.LINE}
        variant={getBtnType(DrawType.LINE)}
        onClick={switchActionHandler}
        disableElevation
      >
        <RemoveIcon style={{ transform: "rotate(225deg)" }} />
      </SquareButton>
      <SquareButton
        value={DrawType.RECTANGLE}
        variant={getBtnType(DrawType.RECTANGLE)}
        onClick={switchActionHandler}
        disableElevation
      >
        <CheckBoxOutlineBlankOutlinedIcon />
      </SquareButton>
      <SquareButton
        value={DrawType.CIRCLE}
        variant={getBtnType(DrawType.CIRCLE)}
        onClick={switchActionHandler}
        disableElevation
      >
        <CircleOutlinedIcon />
      </SquareButton>
      <SquareButton
        value={DrawType.TEXT}
        variant={getBtnType(DrawType.TEXT)}
        onClick={switchActionHandler}
        disableElevation
      >
        <TextFormatOutlinedIcon />
      </SquareButton>
    </Box>
  );
};

export default DrawControl;
