import { Box, Typography } from "@mui/material";
import { RootState } from "app/reduxStore";
import PasswordEditerForm from "feature/user/components/PasswordEditerForm";
import UserInforEditerForm from "feature/user/components/UserInforEditerForm";
import { IUser } from "model/User";
import { useSelector } from "react-redux";
import useUserInforStyle from "./style";
import PersonIcon from "@mui/icons-material/Person";
import AvatarEditerForm from "feature/user/components/AvatarEditerForm";

const UserInforPage = () => {
  const style = useUserInforStyle();

  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <Box className={style.headerIcon}>
          <PersonIcon />
        </Box>
        <Box>
          <Typography variant="h6">Profiles</Typography>
          <Typography>Edit your information</Typography>
        </Box>
      </Box>
      <Box className={style.content}>
        <Box className={style.form}>
          <AvatarEditerForm />
        </Box>
        <Box className={style.form}>
          <UserInforEditerForm />
        </Box>
        <Box className={style.form}>
          <PasswordEditerForm />
        </Box>
      </Box>
    </Box>
  );
};

export default UserInforPage;
