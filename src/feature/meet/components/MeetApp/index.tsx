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
  typeDisplay: number;
  setType: (value: number) => void;
}

const MeetApp: React.FC<IProps> = ({ typeDisplay, setType }) => {
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const members = useSelector((state: RootState) =>
    membersSelector.selectAll(state)
  );
  const [counter, setCounter] = useState<number>(members.length + 1);

  const style = useMeetAppStyle({
    counter: myScreen !== undefined ? counter + 1 : counter,
    onPin: false,
    isShowTask: typeDisplay !== 0,
  });

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
          <React.Fragment key={i._id}>
            <Box className={style.item}>
              <MemberItem member={i} media={i.webcamStream} />
            </Box>
            {i.screenStream && (
              <Box className={style.item}>
                <MemberItem member={i} media={i.screenStream} />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
      {typeDisplay === 2 && (
        <Paper className={style.taskField}>
          <ChatBox control={setType} />
        </Paper>
      )}
    </Box>
  );
};

export default MeetApp;
