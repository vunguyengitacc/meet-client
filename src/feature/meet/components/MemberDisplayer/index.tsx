import { Box, Grid } from "@mui/material";
import { RootState } from "app/reduxStore";
import { IMember } from "model/Member";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemberItem from "../MemberItem";
import useMemberDisplayerStyle from "./style";

const MemberDisplayer = () => {
  const [counter, setCounter] = useState<number>(1);
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);
  const me = useSelector((state: RootState) => state.meet.me) as IMember;

  const style = useMemberDisplayerStyle({
    counter: myScreen !== undefined ? counter + 1 : counter,
  });

  return (
    <Box className={style.surface}>
      <Box className={style.item}>
        {myCam === undefined ? (
          <MemberItem member={me} />
        ) : (
          <MemberItem member={me} media={myCam} />
        )}
      </Box>
      {myScreen && (
        <Box className={style.item}>
          <MemberItem member={me} media={myScreen} />
        </Box>
      )}
      {/* Test */}
    </Box>
  );
};

export default MemberDisplayer;
