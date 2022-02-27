import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "app/reduxStore";
import PasswordInput from "components/Input/PasswordInput";
import { changePassword } from "feature/auth/authSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import changePassScheme, { IChangePasswordParams } from "./form";
import usePasswordEditerFormStyle from "./style";

const PasswordEditerForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<IChangePasswordParams>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(changePassScheme),
  });
  const style = usePasswordEditerFormStyle();

  const changePassHandler = async (data: IChangePasswordParams) => {
    try {
      setIsLoading(true);
      await dispatch(changePassword(data)).then(unwrapResult);
      toast.success("Success");
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const resetHandler = () => {
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(changePassHandler)}>
      <Box display="flex" gap="20px">
        <Box width="100%">
          <Typography variant="h6">Password</Typography>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box padding="20px">
                <Typography className={style.label}>Old password</Typography>
                <PasswordInput
                  form={form}
                  name="currentPassword"
                  className={style.input}
                  errorClassName={style.errInput}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <Box padding="20px">
                <Typography className={style.label}>New password</Typography>
                <PasswordInput
                  form={form}
                  name="newPassword"
                  className={style.input}
                  errorClassName={style.errInput}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box padding="20px">
                <Typography className={style.label}>
                  Confirm password
                </Typography>
                <PasswordInput
                  form={form}
                  name="confirmPassword"
                  className={style.input}
                  errorClassName={style.errInput}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Divider light />
      <Box className={style.submitField}>
        <LoadingButton
          loading={isLoading}
          type="submit"
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

export default PasswordEditerForm;
