import { Box, Grid, Paper } from "@mui/material";
import { RootState } from "app/reduxStore";
import { IMember } from "model/Member";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemberItem from "../MemberItem";
import useMemberDisplayerStyle from "./style";

interface IProps {
  isShowTask: boolean;
}

const MemberDisplayer: React.FC<IProps> = ({ isShowTask }) => {
  const [counter, setCounter] = useState<number>(1);
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);
  const me = useSelector((state: RootState) => state.meet.me) as IMember;

  const style = useMemberDisplayerStyle({
    counter: myScreen !== undefined ? counter + 1 : counter,
    onPin: false,
    isShowTask: isShowTask,
  });

  useEffect(() => {
    console.log(isShowTask);
  }, [isShowTask]);

  return (
    <Box className={style.surface}>
      <Box className={style.membersList}>
        {myScreen && (
          <Box className={`${style.item} ${style.pinItem}`}>
            <MemberItem member={me} media={myScreen} />
          </Box>
        )}
        <Box className={style.item}>
          {myCam === undefined ? (
            <MemberItem member={me} />
          ) : (
            <MemberItem member={me} media={myCam} />
          )}
        </Box>
      </Box>
      <Paper className={style.taskField}>hello</Paper>
    </Box>
  );
};

export default MemberDisplayer;
