import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import MemberControlForm from "../MemberControlForm";
import useAdminControlStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "app/reduxStore";
import { IMember } from "model/Member";

interface IProps {
  control: (value: number) => void;
}

const AdminControl: React.FC<IProps> = ({ control }) => {
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const style = useAdminControlStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.headerField}>
        <Typography variant="h6" className={style.header}>
          Settings
        </Typography>
        <IconButton onClick={() => control(0)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box>{me.isAdmin && <MemberControlForm />}</Box>
    </Box>
  );
};

export default AdminControl;
