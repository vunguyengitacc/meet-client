import { Box } from "@mui/material";
import whiteBoardApi from "api/whiteBoardApi";
import { socketClient } from "app/socketClient";
import DrawBox from "feature/white-board/components/DrawBox";
import HeaderDrawTool from "feature/white-board/components/HeaderDrawTool";
import { IWhiteBoard } from "model/WhiteBoard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWhiteBoardPageStyle from "./style";

const WhiteBoardDetailPage = () => {
  const style = useWhiteBoardPageStyle();
  const { id } = useParams();
  const [board, setBoard] = useState<IWhiteBoard>();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const { data } = await whiteBoardApi.getById(id);
        setBoard(data.whiteBoard);
        socketClient.emit("board:join", data.whiteBoard._id);
        socketClient.on("board:update", (data) => {
          setBoard(data);
        });
      } catch (error) {}
    })();
  }, []);

  return (
    <Box>
      {board && (
        <>
          <Box className={style.header}>
            <HeaderDrawTool board={board} />
          </Box>
          <Box>
            <DrawBox board={board} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default WhiteBoardDetailPage;
