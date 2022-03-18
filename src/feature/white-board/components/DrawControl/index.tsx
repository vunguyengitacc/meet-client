import { Box, Button, Divider } from "@mui/material";
import SquareButton from "components/CustomUI/SquareButton";
import React from "react";
import useDrawControlStyle from "./style";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

interface IProps {
  onSave: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
}

const DrawControl: React.FC<Partial<IProps>> = ({
  onClear,
  onSave,
  onReset,
  onRedo,
  onUndo,
}) => {
  const style = useDrawControlStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.box}>
        <SquareButton
          variant="contained"
          disableElevation
          color="info"
          onClick={onSave}
        >
          Save
        </SquareButton>
        <Divider orientation="vertical" flexItem />
        <SquareButton variant="contained" disableElevation onClick={onUndo}>
          <UndoOutlinedIcon />
        </SquareButton>
        <SquareButton
          variant="contained"
          disableElevation
          color="success"
          onClick={onClear}
        >
          Clear
        </SquareButton>
        <SquareButton variant="contained" disableElevation onClick={onRedo}>
          <RedoOutlinedIcon />
        </SquareButton>
        <Divider orientation="vertical" flexItem />
        <SquareButton
          variant="contained"
          disableElevation
          color="secondary"
          onClick={onReset}
        >
          <HistoryOutlinedIcon />
        </SquareButton>
      </Box>
    </Box>
  );
};

export default DrawControl;
