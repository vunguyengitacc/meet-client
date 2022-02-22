import { Box, Paper } from "@mui/material";
import { RootState } from "app/reduxStore";
import { membersSelector } from "feature/meet/meetSlice";
import { IMember } from "model/Member";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatBox from "../ChatBox";
import MemberItem from "../MemberItem";
import useMeetAppStyle from "./style";

interface IProps {
  isShowTask: boolean;
}

const MeetApp: React.FC<IProps> = ({ isShowTask }) => {
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const members = useSelector((state: RootState) =>
    membersSelector.selectAll(state)
  );
  const [counter, setCounter] = useState<number>(members.length + 1);
  const [typeDisplay, setTypeDisplay] = useState<number>(0);
  const [showTask, setShowTask] = useState<boolean>(isShowTask);

  const style = useMeetAppStyle({
    counter: myScreen !== undefined ? counter + 1 : counter,
    onPin: false,
    isShowTask: showTask,
  });

  useEffect(() => {
    setShowTask(isShowTask);
  }, [isShowTask]);

  useEffect(() => {
    setCounter(members.length + 1);
  }, [members]);

  return (
    <Box className={style.surface}>
      <Box className={style.membersList}>
        {myScreen && (
          <Box className={`${style.item} ${style.pinItem}`} key="me-main">
            <MemberItem member={me} media={myScreen.getTracks()[0]} isMe />
          </Box>
        )}
        <Box className={style.item} key="me-screen">
          {myCam === undefined ? (
            <MemberItem member={me} isMe />
          ) : (
            <MemberItem member={me} media={myCam.getTracks()[0]} isMe />
          )}
        </Box>
        {members.map((i) => (
          <>
            <Box className={style.item} key={`${i._id}-main`}>
              <MemberItem member={i} media={i.webcamStream} />
            </Box>
            {i.screenStream && (
              <Box className={style.item} key={`${i._id}-screen`}>
                <MemberItem member={i} media={i.screenStream} />
              </Box>
            )}
          </>
        ))}
      </Box>
      {typeDisplay === 0 && (
        <Paper className={style.taskField}>
          <ChatBox control={setShowTask} />
        </Paper>
      )}
    </Box>
  );
};

export default MeetApp;
