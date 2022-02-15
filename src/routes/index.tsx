import AuthFeature from "feature/auth";
import LoginPage from "feature/auth/pages/login";
import RegisterPage from "feature/auth/pages/register";
import HomeFeature from "feature/home";
import LandingFeature from "feature/landing";
import MeetFeature from "feature/meet";
import NotFoundPage from "feature/not-found";
import UserFeature from "feature/user";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthEntry from "./AuthEntry";
import PrivateEntry from "./PrivateEntry";

const MasterRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingFeature />} />
        <Route path="/auth" element={<AuthEntry />}>
          <Route path="/auth" element={<AuthFeature />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
        <Route path="/home" element={<PrivateEntry />}>
          <Route path="/home" element={<HomeFeature />} />
        </Route>
        <Route path="/meet" element={<PrivateEntry />}>
          <Route path="/meet" element={<MeetFeature />} />
        </Route>
        <Route path="/user" element={<PrivateEntry />}>
          <Route path="/user" element={<UserFeature />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MasterRoute;