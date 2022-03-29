import { Avatar, Box, IconButton, Menu, Typography } from "@mui/material";
import { RootState } from "app/reduxStore";
import { IUser } from "model/User";
import React from "react";
import { useSelector } from "react-redux";
import Logo from "static/Logo.svg";
import useHeaderDrawToolStyle from "./style";
import { useNavigate } from "react-router-dom";
import { IWhiteBoard } from "model/WhiteBoard";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SquareButton from "components/CustomUI/SquareButton";
import { useForm } from "react-hook-form";
import TextInput from "components/Input/TextInput";
import whiteBoardApi from "api/whiteBoardApi";
import toast from "react-hot-toast";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import { DrawControl } from "utilities/drawUtil";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import MenuSelectItem from "../MenuSelectItem";

interface IProps {
  board?: IWhiteBoard;
}

const HeaderDrawTool: React.FC<IProps> = ({ board }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const navigator = useNavigate();
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;
  const style = useHeaderDrawToolStyle();

  const form = useForm<Partial<IWhiteBoard>>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: board,
  });

  const changeHandler = async (data: Partial<IWhiteBoard>) => {
    try {
      data._id = board?._id;
      await whiteBoardApi.updateOne(data);
      toast.success("Success");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box className={style.surface}>
      <img className={style.img} src={Logo} onClick={() => navigator("/app")} />
      {currentUser._id === board?.userId ? (
        <form onSubmit={form.handleSubmit(changeHandler)} className={style.frm}>
          <TextInput
            spellCheck={false}
            className={style.nameField}
            form={form}
            name="name"
            placeHolder="Type name here"
            autoComplete="off"
          />
          <SquareButton
            type="submit"
            sx={{ padding: "10px !important" }}
            disableElevation
            variant="contained"
          >
            <BorderColorOutlinedIcon />
          </SquareButton>
        </form>
      ) : (
        <Typography variant="h6">{board?.name}</Typography>
      )}
      <Box display="flex" gap="20px">
        {board?.userId === currentUser._id && (
          <IconButton onClick={handleClick}>
            {board?.type === DrawControl.PRIVATE && <PublicOffIcon />}
            {board?.type === DrawControl.VIEW && <RemoveRedEyeOutlinedIcon />}
            {board?.type === DrawControl.EDIT && <BrushOutlinedIcon />}
          </IconButton>
        )}
        <Menu
          PaperProps={{ className: style.menuSurface }}
          MenuListProps={{
            style: {
              padding: "0",
            },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Box className={style.menu}>
            <MenuSelectItem
              startIcon={<PublicOffIcon />}
              value={DrawControl.PRIVATE}
              description="No one can access to this board accept you"
              selected={board?.type === DrawControl.PRIVATE}
              onClick={() =>
                changeHandler({ _id: board?._id, type: DrawControl.PRIVATE })
              }
            />
            <MenuSelectItem
              startIcon={<RemoveRedEyeOutlinedIcon />}
              value={DrawControl.VIEW}
              description="Other user only see what you do but can't edit the board"
              selected={board?.type === DrawControl.VIEW}
              onClick={() =>
                changeHandler({ _id: board?._id, type: DrawControl.VIEW })
              }
            />
            <MenuSelectItem
              startIcon={<BrushOutlinedIcon />}
              value={DrawControl.EDIT}
              description="Other user can edit the board"
              selected={board?.type === DrawControl.EDIT}
              onClick={() =>
                changeHandler({ _id: board?._id, type: DrawControl.EDIT })
              }
            />
          </Box>
        </Menu>
        <IconButton onClick={() => navigator("/user/profile")}>
          <Avatar src={currentUser.avatarURI} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderDrawTool;
