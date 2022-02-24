import {
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import useMemberListBoxStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "app/reduxStore";
import { membersSelector } from "feature/meet/meetSlice";
import MemberItem from "../MemberItem";
import SearchIcon from "@mui/icons-material/Search";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { IMember } from "model/Member";
import AddIcon from "@mui/icons-material/Add";
import MemberControlForm from "../MemberControlForm";

interface IProps {
  control: (value: number) => void;
}

const MemberListBox: React.FC<IProps> = ({ control }) => {
  const members = useSelector((state: RootState) =>
    membersSelector.selectAll(state)
  );
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const [filter, setFilter] = useState<string>("");
  const [openControlModal, setOpenControlModal] = useState<boolean>(false);
  const style = useMemberListBoxStyle();

  const setFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  const closeModalHandler = () => {
    setOpenControlModal(false);
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
      {me.isAdmin && (
        <Box className={style.controlField}>
          <Box className={style.controlItem}>
            <Button
              className={style.controlBtn}
              startIcon={<AddIcon />}
              color="secondary"
            >
              Invite
            </Button>
          </Box>
          <Box className={style.controlItem}>
            <Button
              startIcon={<AdminPanelSettingsIcon />}
              className={style.controlBtn}
              color="secondary"
              onClick={() => setOpenControlModal(true)}
            >
              Admin Settings
            </Button>

            <Modal
              className={style.modalField}
              open={openControlModal}
              onClose={closeModalHandler}
            >
              <Paper className={style.formField}>
                <MemberControlForm control={setOpenControlModal} />
              </Paper>
            </Modal>
          </Box>
        </Box>
      )}
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
        {members
          .filter((j) => j.user?.fullname.includes(filter))
          .map((i) => (
            <MemberItem key={i._id} member={i} />
          ))}
      </Box>
    </Box>
  );
};

export default MemberListBox;
