import { Box, Button, InputBase, Typography } from "@mui/material";
import React from "react";
import useInvitationControlStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

interface IProps {
  control: (value: boolean) => void;
}

const InvitationControl: React.FC<IProps> = ({ control }) => {
  const style = useInvitationControlStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.headerField}>
        <Typography variant="h6">Invite member</Typography>
        <Button
          variant="contained"
          disableElevation
          color="error"
          onClick={() => control(false)}
        >
          <CloseIcon />
        </Button>
      </Box>
      <Box className={style.searchInput}>
        <InputBase
          startAdornment={
            <SearchIcon style={{ marginRight: "10px", color: "#dddddd" }} />
          }
          fullWidth
          placeholder="Type name or id"
        />
      </Box>
    </Box>
  );
};

export default InvitationControl;
