import { Box, IconButton, InputBase, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import useMemberListBoxStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "app/reduxStore";
import { membersSelector } from "feature/meet/meetSlice";
import MemberItem from "../MemberItem";
import SearchIcon from "@mui/icons-material/Search";
import { IMember } from "model/Member";

interface IProps {
  control: (value: number) => void;
}

const MemberListBox: React.FC<IProps> = ({ control }) => {
  const myScreen = useSelector((state: RootState) => state.media.myScreen);
  const members = useSelector((state: RootState) =>
    membersSelector.selectAll(state)
  );
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const [filter, setFilter] = useState<string>("");
  const style = useMemberListBoxStyle();

  const setFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <Box className={style.surface}>
      <Box className={style.headerField}>
        <Typography variant="h6" className={style.header}>
          Members
        </Typography>
        <IconButton onClick={() => control(0)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className={style.filterField}>
        <InputBase
          onChange={setFilterHandler}
          startAdornment={
            <SearchIcon style={{ color: "gray", marginRight: "10px" }} />
          }
          fullWidth
          className={style.filterInput}
          autoComplete="off"
          placeholder="Type some name"
        />
      </Box>
      <Box className={style.listField}>
        {me.user?.fullname.includes(filter) && (
          <React.Fragment key={me.joinSession}>
            <MemberItem member={me} isMe />
            {myScreen && <MemberItem member={me} isMe isScreen />}
          </React.Fragment>
        )}
        {members
          .filter((j) => j.user?.fullname.includes(filter))
          .map((i) => (
            <React.Fragment key={i.joinSession}>
              <MemberItem member={i} />
              {i.screenStream && <MemberItem member={i} isScreen />}
            </React.Fragment>
          ))}
      </Box>
    </Box>
  );
};

export default MemberListBox;
