import { Badge, Box, Button, Chip } from "@mui/material";
import { Modal, Paper, Typography } from "@mui/material";
import { RootState } from "app/reduxStore";
import { membersSelector, requestsSelector } from "feature/meet/meetSlice";
import { IMember } from "model/Member";
import { IRoom } from "model/Room";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatBox from "../ChatBox";
import MeetItem from "../MeetItem";
import MemberListBox from "../MemberListBox";
import useMeetAppStyle from "./style";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminControl from "../AdminControl";
import InvitationControl from "../InvitationControl";
import RequestControl from "../RequestControl";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface IProps {
  typeDisplay: number;
  setType: (value: number) => void;
}

const MeetApp: React.FC<IProps> = ({ typeDisplay, setType }) => {
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const pin = useSelector((state: RootState) => state.meet.pinItem);
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const requests = useSelector((state: RootState) =>
    requestsSelector.selectAll(state)
  );
  const members = useSelector((state: RootState) =>
    membersSelector.selectAll(state)
  );
  const [counter, setCounter] = useState<number>(members.length + 1);
  const [openModalInvitation, setOpenModalInvitation] =
    useState<boolean>(false);
  const [isPin, setIsPin] = useState<boolean>(false);
  const [openModalRequest, setOpenModalRequest] = useState<boolean>(false);

  const style = useMeetAppStyle({
    counter: myScreen !== undefined ? counter + 1 : counter,
    onPin: isPin,
    isShowTask: typeDisplay !== 0,
  });
  useEffect(() => {
    setCounter(members.length + 1);
    let flag =
      members.filter(
        (i) =>
          i._id + "-cam" === pin ||
          (i.screenStream && i._id + "-screen" === pin)
      ).length > 0;
    setIsPin(flag);
  }, [members]);

  useEffect(() => {
    if (me._id + "-cam" === pin || me._id + "-screen" === pin) {
      setIsPin(true);
      return;
    }
    let flag =
      members.filter(
        (i) =>
          i._id + "-cam" === pin ||
          (i.screenStream && i._id + "-screen" === pin)
      ).length > 0;
    setIsPin(flag);
  }, [pin]);

  return (
    <Box className={style.surface}>
      <Box className={style.appField}>
        <Box className={style.appHeader}>
          <Box display="flex" gap="10px" alignItems="center">
            <Typography color="white" variant="h6">
              {room.accessCode}
            </Typography>
            <Chip
              label={<b>{room.isPrivate ? "Private" : "Public"}</b>}
              variant="filled"
              color={room.isPrivate ? "warning" : "info"}
            />
            {room.isRecording && (
              <Chip
                label={<b>On recording...</b>}
                variant="filled"
                color="error"
              />
            )}
          </Box>
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" gap="10px" alignItems="center" color="white">
                <PeopleAltIcon />
                <Typography color="white">Member in room</Typography>
                <Chip
                  label={<b>{members.length + 1}</b>}
                  variant="filled"
                  color="primary"
                  style={{ borderRadius: "10px !important" }}
                />
              </Box>
              {me.isAdmin && (
                <Box sx={{ display: { xs: "none", sm: "flex" } }} gap="10px">
                  {room.isPrivate && (
                    <>
                      <Badge badgeContent={requests.length} color="error">
                        <Button
                          startIcon={<MapsUgcIcon />}
                          variant="contained"
                          disableElevation
                          color="warning"
                          onClick={() => setOpenModalRequest(true)}
                        >
                          Requests
                        </Button>
                      </Badge>
                      <Modal
                        open={openModalRequest}
                        onClose={() => setOpenModalRequest(false)}
                        className={style.inviteModal}
                      >
                        <Paper className={style.modal}>
                          <RequestControl control={setOpenModalRequest} />
                        </Paper>
                      </Modal>
                    </>
                  )}
                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    variant="contained"
                    disableElevation
                    color="success"
                    onClick={() => setOpenModalInvitation(true)}
                  >
                    Invite
                  </Button>
                  <Modal
                    open={openModalInvitation}
                    onClose={() => setOpenModalInvitation(false)}
                    className={style.inviteModal}
                  >
                    <Paper className={style.modal}>
                      <InvitationControl control={setOpenModalInvitation} />
                    </Paper>
                  </Modal>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box className={style.membersList}>
          {myScreen && (
            <Box
              className={`${style.item} ${
                me._id + "-screen" === pin && style.pinItem
              }`}
              key="me-main"
            >
              <MeetItem
                member={me}
                media={myScreen.getTracks()[0]}
                isMe
                type="screen"
              />
            </Box>
          )}
          <Box
            className={`${style.item} ${
              me._id + "-cam" === pin && style.pinItem
            }`}
            key="me-screen"
          >
            {myCam === undefined ? (
              <MeetItem member={me} isMe type="cam" />
            ) : (
              <MeetItem
                member={me}
                media={myCam.getTracks()[0]}
                isMe
                type="cam"
              />
            )}
          </Box>
          {members.map((i) => (
            <React.Fragment key={i._id}>
              <Box
                className={`${style.item} ${
                  pin === i._id + "-cam" && style.pinItem
                }`}
              >
                <MeetItem member={i} media={i.webcamStream} type="cam" />
              </Box>
              {i.screenStream && (
                <Box
                  className={`${style.item} ${
                    pin === i._id + "-screen" && style.pinItem
                  }`}
                >
                  <MeetItem member={i} media={i.screenStream} type="screen" />
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      {typeDisplay === 1 && (
        <Paper className={style.taskField}>
          <MemberListBox control={setType} />
        </Paper>
      )}
      {typeDisplay === 2 && (
        <Paper className={style.taskField}>
          <ChatBox control={setType} />
        </Paper>
      )}
      {typeDisplay === 3 && (
        <Paper className={style.taskField}>
          <AdminControl control={setType} />
        </Paper>
      )}
    </Box>
  );
};

export default MeetApp;
