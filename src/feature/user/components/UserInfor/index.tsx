import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import { InputBase } from "@mui/material";
import { RootState } from "app/reduxStore";
import { IUser } from "model/User";
import React from "react";
import { useSelector } from "react-redux";
import PasswordEditerForm from "../PasswordEditerForm";
import UserInforEditerForm from "../UserInforEditerForm";
import useUserInforStyle from "./style";

const UserInfor = () => {
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;
  const style = useUserInforStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.form}>
        <Box display="flex" gap="20px">
          <Box>
            <Typography variant="h6">Avatar</Typography>
            <Typography variant="subtitle1">
              A beautiful and impressive avatar will help your account look more
              distinctive and make it easy for other people to find you.
            </Typography>
          </Box>
          <Box padding="20px">
            <Avatar className={style.avatar} src={currentUser.avatarURI} />
          </Box>
        </Box>
        <Divider light />
        <Box className={style.submitField}>
          <Button variant="contained" disableElevation>
            Save
          </Button>
          <Button variant="contained" disableElevation color="inherit">
            Save
          </Button>
        </Box>
      </Box>
      <Box className={style.form}>
        <UserInforEditerForm />
      </Box>
      <Box className={style.form}>
        <PasswordEditerForm />
      </Box>
    </Box>
  );
};

export default UserInfor;
