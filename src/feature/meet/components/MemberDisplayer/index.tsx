import { Box, Grid, Paper } from "@mui/material";
import { RootState } from "app/reduxStore";
import { membersSelector } from "feature/meet/meetSlice";
import { IMember } from "model/Member";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemberItem from "../MemberItem";
import useMemberDisplayerStyle from "./style";

interface IProps {
  isShowTask: boolean;
}

const MemberDisplayer: React.FC<IProps> = ({ isShowTask }) => {
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const members = useSelector((state: RootState) =>
    membersSelector.selectAll(state)
  );
  const [counter, setCounter] = useState<number>(members.length + 1);

  const style = useMemberDisplayerStyle({
    counter: myScreen !== undefined ? counter + 1 : counter,
    onPin: false,
    isShowTask: isShowTask,
  });

  useEffect(() => {
    setCounter(members.length + 1);
  }, [members]);

  return (
    <Box className={style.surface}>
      <Box className={style.membersList}>
        {myScreen && (
          <Box className={`${style.item} ${style.pinItem}`}>
            <MemberItem member={me} media={myScreen.getTracks()[0]} />
          </Box>
        )}
        <Box className={style.item}>
          {myCam === undefined ? (
            <MemberItem member={me} />
          ) : (
            <MemberItem member={me} media={myCam.getTracks()[0]} />
          )}
        </Box>
        {members.map((i) => (
          <Box className={style.item} key={i._id}>
            <MemberItem member={i} media={i.webcamStream} />
          </Box>
        ))}
      </Box>
      <Paper className={style.taskField}>hello</Paper>
    </Box>
  );
};

export default MemberDisplayer;
