import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { InputBase } from "@mui/material";
import { RootState } from "app/reduxStore";
import { IUser } from "model/User";
import React from "react";
import { useSelector } from "react-redux";
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
        <Box display="flex" gap="20px">
          <Box>
            <Typography variant="h6">Information</Typography>
            <Box display="flex" alignItems="center" gap="20px" padding="20px">
              <Typography>Fullname</Typography>
              <InputBase fullWidth></InputBase>
            </Box>
            <Box display="flex" alignItems="center" gap="20px" padding="20px">
              <Typography>Email</Typography>
              <InputBase fullWidth></InputBase>
            </Box>
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
        <Box display="flex" gap="20px">
          <Box width="100%">
            <Typography variant="h6">Password</Typography>
            <Box display="flex" alignItems="center" gap="20px" padding="20px">
              <Typography style={{ width: "40%" }}>Old password</Typography>
              <InputBase fullWidth></InputBase>
            </Box>
            <Box display="flex" alignItems="center" gap="20px" padding="20px">
              <Typography style={{ width: "40%" }}>New password</Typography>
              <InputBase fullWidth></InputBase>
            </Box>
            <Box display="flex" alignItems="center" gap="20px" padding="20px">
              <Typography style={{ width: "40%" }}>Confirm password</Typography>
              <InputBase fullWidth></InputBase>
            </Box>
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
    </Box>
  );
};

export default UserInfor;
