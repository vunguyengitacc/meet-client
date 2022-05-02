import { Box, Divider, Modal } from "@mui/material";
import SquareButton from "components/CustomUI/SquareButton";
import React from "react";
import useDrawControlStyle from "./style";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ImageExport from "../ImageExport";

interface IProps {
  onSave: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  exportHandler: (type: string, name?: string) => void;
}

const DrawControl: React.FC<Partial<IProps>> = ({
  onClear,
  onSave,
  onReset,
  onRedo,
  onUndo,
  exportHandler,
}) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const style = useDrawControlStyle();

  const modalCloseHandler = () => {
    setOpenModal(false);
  };

  const openExportFormHandler = () => {
    setOpenModal(true);
  };

  return (
    <Box className={style.surface}>
      <Box className={style.box}>
        <SquareButton
          variant="contained"
          disableElevation
          color="warning"
          onClick={openExportFormHandler}
        >
          <FileDownloadOutlinedIcon />
        </SquareButton>
        <Modal open={openModal} onClose={modalCloseHandler}>
          <>
            <ImageExport
              handleClose={modalCloseHandler}
              exportHandler={exportHandler}
            />
          </>
        </Modal>
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
