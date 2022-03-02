import { Box, Button, Divider, Menu } from "@mui/material";
import { Paper, Typography } from "@mui/material";
import { MenuItem, Modal, OutlinedInput } from "@mui/material";
import React from "react";
import useRoomCreatorStyle from "./style";
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BoltIcon from "@mui/icons-material/Bolt";
import roomApi from "api/roomApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/reduxStore";
import { createRoom } from "feature/meet/meetSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import RoomCreatorModal from "../RoomCreatorModal";

const RoomCreator = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const inputCodeEl = React.useRef<HTMLInputElement>(null);

  const style = useRoomCreatorStyle();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const createRoomHandler = async () => {
    try {
      const data = await dispatch(createRoom({ isPrivate: true })).then(
        unwrapResult
      );
      const code = data.room.accessCode;
      navigator(`/meet/${code}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const code = inputCodeEl.current?.value;
      if (!code) throw new Error("Please type a code");
      navigator(`/meet/${code}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box className={style.surface}>
      <Typography variant="h2">Create your meeting</Typography>
      <Typography sx={{ fontWeight: 100 }} variant="h5" color="secondary">
        Easy and free service for you to create an meeting online. Create and
        share your room code or link to everyone.
      </Typography>
      <Box display="flex" gap={3} marginTop="10px">
        <Button
          startIcon={<AddIcon />}
          onClick={handleClick}
          variant="contained"
          disableElevation
        >
          Create Room
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            className={style.menuCreatorItem}
            onClick={() => {
              handleOpenModal();
              handleClose();
            }}
          >
            <EventNoteIcon />
            Create and use later
          </MenuItem>
          <Divider />
          <MenuItem
            className={style.menuCreatorItem}
            onClick={() => {
              handleClose();
              createRoomHandler();
            }}
          >
            <BoltIcon />
            Create a meet right now
          </MenuItem>
        </Menu>
        <Box display="flex" gap={1}>
          <OutlinedInput
            placeholder="Pass a room code here"
            inputRef={inputCodeEl}
            style={{ borderRadius: "10px" }}
          />
          <Button color="secondary" disableElevation onClick={handleJoinRoom}>
            Join
          </Button>
        </Box>
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box display="flex" width="100vw" height="100vh">
          <Paper className={style.modal}>
            <RoomCreatorModal control={setOpenModal} />
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default RoomCreator;
