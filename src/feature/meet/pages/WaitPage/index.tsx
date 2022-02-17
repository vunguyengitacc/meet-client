import { Box, Button } from "@mui/material";
import memberApi from "api/memberApi";
import { AppDispatch, RootState } from "app/reduxStore";
import { setJoinCode } from "feature/meet/meetSlice";
import { IRoom } from "model/Room";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const WaitPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const [isWait, setIsWait] = useState<boolean>(false);

  const handleJoin = async () => {
    try {
      const rs = await memberApi.join(room);
      if (rs.data.joinCode !== undefined)
        dispatch(setJoinCode(rs.data.joinCode));
      else setIsWait(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Button onClick={handleJoin}>Join</Button>
    </Box>
  );
};

export default WaitPage;
