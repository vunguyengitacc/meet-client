import { Avatar, Box, Button, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import useInvitationControlStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SquareButton from "components/CustomUI/SquareButton";
import { IUser } from "model/User";
import userApi from "api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "app/reduxStore";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import invitationApi from "api/invitationApi";
import { IRoom } from "model/Room";

interface IProps {
  control: (value: boolean) => void;
}

const InvitationControl: React.FC<IProps> = ({ control }) => {
  const [term, setTerm] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;

  const style = useInvitationControlStyle();

  const setTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.currentTarget.value);
  };

  const searchHandler = async () => {
    try {
      if (!term) return;
      const { data } = await userApi.search({ term, not: [currentUser._id] });
      setUsers(data.users);
    } catch (error) {}
  };

  const sendInvitationHandler = async (user: IUser) => {
    try {
      const { data } = await invitationApi.create({
        roomId: room._id,
        userId: user._id,
      });
      setUsers(users.filter((i) => i._id != user._id));
    } catch (error) {}
  };

  return (
    <Box className={style.surface}>
      <Box className={style.headerField}>
        <Typography variant="h6">Invitation</Typography>
        <SquareButton
          variant="contained"
          disableElevation
          color="error"
          onClick={() => control(false)}
        >
          <CloseIcon />
        </SquareButton>
      </Box>
      <Box display="flex" gap="10px">
        <Box className={style.searchInput}>
          <InputBase
            startAdornment={
              <SearchIcon style={{ marginRight: "10px", color: "#dddddd" }} />
            }
            fullWidth
            placeholder="Type user's information"
            onChange={setTermHandler}
          />
        </Box>
        <Button variant="contained" disableElevation onClick={searchHandler}>
          Search
        </Button>
      </Box>
      <Box className={style.searchResults}>
        {users.map((i, index) => (
          <Box className={style.searchItem} key={index}>
            <Box display="flex" alignItems="center" gap="10px">
              <Avatar src={i.avatarURI} />
              <Typography variant="subtitle1">
                <b>{i.fullname}</b>
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="success"
                disableElevation
                onClick={() => sendInvitationHandler(i)}
              >
                <ForwardToInboxIcon />
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InvitationControl;
