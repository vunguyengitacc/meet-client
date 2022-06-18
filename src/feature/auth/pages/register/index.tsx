import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "app/reduxStore";
import PasswordInput from "components/Input/PasswordInput";
import TextInput from "components/Input/TextInput";
import { getMe, getMyNotification, register } from "feature/auth/authSlice";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import registerScheme, { IRegisterParams } from "./form";
import useRegisterPageStyle from "./style";

const RegisterPage = () => {
  const style = useRegisterPageStyle();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();

  const form = useForm<IRegisterParams>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(registerScheme),
  });

  const submitLogin = async (data: IRegisterParams) => {
    setIsLoading(true);
    try {
      await dispatch(register(data)).then(unwrapResult);
      toast.success(
        "Successfully create account! Please verify your account in your email"
      );
      navigator("/auth/login");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Box className={style.surface}>
      <Typography variant="h4">Sign Up</Typography>
      <Typography variant="subtitle1" color="secondary">
        Please fill some field below for register
      </Typography>
      <form onSubmit={form.handleSubmit(submitLogin)} className={style.form}>
        <TextInput
          className={style.inputField}
          form={form}
          name="username"
          placeHolder="username"
        />
        <TextInput
          className={style.inputField}
          form={form}
          name="email"
          placeHolder="email"
        />
        <TextInput
          className={style.inputField}
          form={form}
          name="fullname"
          placeHolder="fullname"
        />
        <PasswordInput
          className={style.inputField}
          form={form}
          name="password"
          blockCopy={true}
          blockPaste={true}
          placeHolder="password"
          autoComplete="off"
        />
        <PasswordInput
          className={style.inputField}
          form={form}
          name="confirm"
          blockCopy={true}
          blockPaste={true}
          placeHolder="confirm password"
          autoComplete="off"
        />
        <LoadingButton
          className={style.submitBtn}
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
          loading={isLoading}
        >
          Register
        </LoadingButton>
        <Box display="flex" gap="10px" flexDirection="column">
          <Link className={style.link} to="/auth/login">
            <Typography variant="subtitle1" color="secondary">
              Already have account?
            </Typography>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterPage;
