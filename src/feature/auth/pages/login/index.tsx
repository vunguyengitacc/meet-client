import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import loginScheme, { ILoginParams } from "./form";
import useLoginPageStyle from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "components/Input/TextInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/reduxStore";
import toast from "react-hot-toast";
import { getMe, login } from "feature/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import PasswordInput from "components/Input/PasswordInput";

const LoginPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const style = useLoginPageStyle();
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();

  const form = useForm<ILoginParams>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      account: "",
      password: "",
    },
    resolver: yupResolver(loginScheme),
  });

  const submitLogin = async (data: ILoginParams) => {
    setIsLoading(true);
    try {
      await dispatch(login(data)).then(unwrapResult);
      await dispatch(getMe()).then(unwrapResult);
      toast.success("Success");
      navigator("/app");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Box className={style.surface}>
      <Typography variant="h4">Sign In</Typography>
      <Typography variant="subtitle1" color="secondary">
        You'll need to an account to use our service. If you want to create one
        click the link below
      </Typography>
      <form onSubmit={form.handleSubmit(submitLogin)} className={style.form}>
        <TextInput
          className={style.inputField}
          form={form}
          name="account"
          placeHolder="account"
        />
        <PasswordInput
          className={style.inputField}
          form={form}
          name="password"
          placeHolder="password"
          blockCopy={true}
          blockPaste={true}
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
          Log in
        </LoadingButton>
        <Box display="flex" gap="10px" flexDirection="column">
          <Link className={style.link} to="/auth/register">
            <Typography variant="subtitle1" color="secondary">
              Don't have an account?
            </Typography>
          </Link>
          <Link className={style.link} to="/">
            <Typography variant="subtitle1" color="secondary">
              Come back to landing page
            </Typography>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
