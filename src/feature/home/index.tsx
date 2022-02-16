import { Button } from "@mui/material";
import { AppDispatch } from "app/reduxStore";
import { logout } from "feature/auth/authSlice";
import React from "react";
import { useDispatch } from "react-redux";

const HomeFeature = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </div>
  );
};

export default HomeFeature;
