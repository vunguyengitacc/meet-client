import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useWhiteBoardControlStyle from "./style";
import AddIcon from "@mui/icons-material/Add";
import whiteBoardApi from "api/whiteBoardApi";
import { IWhiteBoard } from "model/WhiteBoard";
import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";

interface IProps {
  control: (value: number) => void;
}

const WhiteBoardControl: React.FC<IProps> = ({ control }) => {
  const [boards, setBoards] = useState<IWhiteBoard[]>([]);

  const style = useWhiteBoardControlStyle();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await whiteBoardApi.getAll();
        setBoards(data.whiteBoards);
      } catch (error) {}
    })();
  }, []);

  const createBoardHandler = async () => {
    try {
      const { data } = await whiteBoardApi.createOne({ data: [] });
      window.open(`http://localhost:3000/whiteboard/${data.whiteboard._id}`);
    } catch (error) {}
  };

  const browseBoardHandler = async (value: IWhiteBoard) => {
    window.open(`http://localhost:3000/whiteboard/${value._id}`);
  };

  return (
    <Box className={style.surface}>
      <Box className={style.headerField}>
        <Typography variant="h6" className={style.header}>
          WhiteBoard
        </Typography>
        <IconButton onClick={() => control(0)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className={style.tipField}>
        <Typography color="secondary" className={style.tip}>
          You can create some white board which allows you to draw, that will
          help you a lot when make a presentation
        </Typography>
      </Box>
      <Box className={style.frmBox}>
        <Box>
          <Typography variant="subtitle1">Your current white boards</Typography>
          {boards.map((i, index) => (
            <Box key={index} className={style.boardItem}>
              <Box sx={{ fontWeight: 500 }}>{i.name ? i.name : i._id}</Box>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => browseBoardHandler(i)}
              >
                <ScreenShareOutlinedIcon />
              </Button>
            </Box>
          ))}
        </Box>
        <Button
          onClick={createBoardHandler}
          variant="blur"
          sx={{ padding: "15px" }}
          fullWidth
          startIcon={<AddIcon />}
        >
          Create New Board
        </Button>
      </Box>
    </Box>
  );
};

export default WhiteBoardControl;
