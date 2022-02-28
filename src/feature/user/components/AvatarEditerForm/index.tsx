import { LoadingButton } from "@mui/lab";
import { Box, Typography, Menu, Button, Divider, Avatar } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/reduxStore";
import ImageSearch from "components/ImageSearch";
import { updateInfor } from "feature/auth/authSlice";
import { IUser } from "model/User";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useAvatarEditerFormStyle from "./style";

const AvatarEditerForm = () => {
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [imageFetch, setImageFetch] = React.useState<string>(
    currentUser.avatarURI
  );
  const [imageUrl, setImageUrl] = React.useState<string>(currentUser.avatarURI);

  const dispatch = useDispatch<AppDispatch>();
  const style = useAvatarEditerFormStyle();
  const setAnchorHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const chooseHandler = () => {
    if (imageUrl === "") return;
    setImageUrl(imageFetch);
    handleClose();
  };

  const resetHandler = () => {
    setImageUrl(currentUser.avatarURI);
  };

  const changeHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(updateInfor({ avatarURI: imageUrl })).then(unwrapResult);
      toast.success("Success");
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Box display="flex" gap="20px">
        <Box>
          <Typography variant="h6">Avatar</Typography>
          <Typography variant="subtitle1">
            A beautiful and impressive avatar will help your account look more
            distinctive and make it easy for other people to find you.
          </Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Box maxWidth="80vw" width="450px" borderRadius="20px">
            <ImageSearch setImage={setImageFetch} />
            <Box padding="10px" display="flex" gap="10px">
              <Button
                color="primary"
                disableElevation
                variant="contained"
                fullWidth
                disabled={imageUrl === ""}
                onClick={chooseHandler}
              >
                Choose
              </Button>
              <Button
                color="inherit"
                disableElevation
                variant="contained"
                fullWidth
              >
                Local
              </Button>
            </Box>
          </Box>
        </Menu>
        <Box padding="20px" component="div" onClick={setAnchorHandler}>
          <Avatar className={style.avatar} src={imageUrl} />
        </Box>
      </Box>
      <Divider light />
      <Box className={style.submitField}>
        <LoadingButton
          loading={isLoading}
          onClick={changeHandler}
          variant="contained"
          disableElevation
        >
          Save
        </LoadingButton>
        <Button
          onClick={resetHandler}
          variant="contained"
          disableElevation
          color="inherit"
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default AvatarEditerForm;
