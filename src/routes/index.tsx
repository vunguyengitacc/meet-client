import AuthFeature from "feature/auth";
import LoginPage from "feature/auth/pages/login";
import RegisterPage from "feature/auth/pages/register";
import AppFeature from "feature/app";
import LandingFeature from "feature/landing";
import MeetFeature from "feature/meet";
import NotFoundPage from "feature/not-found";
import UserFeature from "feature/user";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthEntry from "./AuthEntry";
import PrivateEntry from "./PrivateEntry";
import CalendarPage from "feature/user/pages/CalendarPage";
import UserInforPage from "feature/user/pages/UserInforPage";
import NotificationPage from "feature/user/pages/NotificationPage";
import WhiteBoardFeature from "feature/white-board";
import WhiteBoardDetailPage from "feature/white-board/pages/WhiteBoardPage";

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
        <Route path="/app" element={<PrivateEntry />}>
          <Route path="/app" element={<AppFeature />} />
        </Route>
        <Route path="/meet" element={<PrivateEntry />}>
          <Route path="/meet/:code" element={<MeetFeature />} />
        </Route>
        <Route path="/user" element={<PrivateEntry />}>
          <Route path="/user" element={<UserFeature />}>
            <Route path="profile" element={<UserInforPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="notification" element={<NotificationPage />} />
          </Route>
        </Route>
        <Route path="/whiteboard" element={<PrivateEntry />}>
          <Route path="/whiteboard" element={<WhiteBoardFeature />}>
            <Route path="/whiteboard/:id" element={<WhiteBoardDetailPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MasterRoute;
