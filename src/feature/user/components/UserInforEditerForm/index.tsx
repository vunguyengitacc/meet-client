import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/reduxStore";
import TextInput from "components/Input/TextInput";
import { updateInfor } from "feature/auth/authSlice";
import { IUser } from "model/User";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import updateMeScheme from "./form";
import useUserInforEditerFormStyle from "./style";

const UserInforEditerForm = () => {
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<Partial<IUser>>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...currentUser,
      email: !currentUser.isVerifyEmail
        ? currentUser.oldEmail
        : currentUser.email,
    },
    resolver: yupResolver(updateMeScheme),
  });
  const style = useUserInforEditerFormStyle();

  const updateInforHandler = async (data: Partial<IUser>) => {
    try {
      setIsLoading(true);
      const result = await dispatch(updateInfor(data)).then(unwrapResult);
      console.log(result);
      if (result?.isUpdateEmail)
        toast.success(
          "Successfully updating infor! Please verify your new email address"
        );
      else toast.success("Success");
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const resetHandler = () => {
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(updateInforHandler)}>
      <Box display="flex" gap="20px">
        <Box width="100%">
          <Typography variant="h6">Information</Typography>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box padding="20px">
                <Typography className={style.label}>Name</Typography>
                <TextInput
                  form={form}
                  name="fullname"
                  className={style.input}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box padding="20px">
                <Typography className={style.label}>Email</Typography>
                <TextInput form={form} name="email" className={style.input} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box padding="20px">
                <Typography className={style.label}>Address</Typography>
                <TextInput form={form} name="address" className={style.input} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box padding="20px">
                <Typography className={style.label}>Phone</Typography>
                <TextInput form={form} name="phone" className={style.input} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box padding="20px">
                <Typography className={style.label}>Bio</Typography>
                <TextInput form={form} name="bio" className={style.input} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Divider light />
      <Box className={style.submitField}>
        <LoadingButton
          type="submit"
          loading={isLoading}
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
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default UserInforEditerForm;
