import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import useRoomCreatorStyle from "./style";
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BoltIcon from "@mui/icons-material/Bolt";
import roomApi from "api/roomApi";

const RoomCreator = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
      const res = await roomApi.create();
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
              handleClose();
              createRoomHandler();
            }}
          >
            <BoltIcon />
            Create a meet right now
          </MenuItem>

          <Divider />
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
        </Menu>
        <Box display="flex" gap={1}>
          <OutlinedInput placeholder="Pass a room code here" />
          <Button color="secondary" disableElevation>
            Join
          </Button>
        </Box>
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper className={style.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Paper>
      </Modal>
    </Box>
  );
};

export default RoomCreator;