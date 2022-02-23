import { Box, IconButton, InputBase, Switch, Typography } from "@mui/material";
import React from "react";
import useChatBoxStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/reduxStore";
import { useForm } from "react-hook-form";
import messageScheme, { IMessageParams } from "./form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import TextInput from "components/Input/TextInput";
import SendIcon from "@mui/icons-material/Send";
import messageApi from "api/messageApi";
import MessageBox from "../MessageBox";
import { updateRoom } from "feature/meet/meetSlice";
import { IRoom } from "model/Room";

interface IProps {
  control: (value: boolean) => void;
}

const ChatBox: React.FC<IProps> = ({ control }) => {
  const { room, me } = useSelector((state: RootState) => state.meet);
  const dispatch = useDispatch<AppDispatch>();
  const style = useChatBoxStyle();
  const form = useForm<IMessageParams>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(messageScheme),
  });

  const submitMessage = async (data: IMessageParams) => {
    try {
      form.reset();
      if (me === undefined) return;
      await messageApi.create({ member: me, message: data });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleToogleAllowMessage = async () => {
    dispatch(
      updateRoom({
        room: { _id: room?._id, isAllowMessage: !room?.isAllowMessage },
        notification: !room?.isAllowMessage
          ? "Admin enable chat feature"
          : "Admin block chat feature",
      })
    );
  };

  return (
    <Box className={style.surface}>
      <Box className={style.headerField}>
        <Typography variant="h6" className={style.header}>
          Messages
        </Typography>
        <IconButton onClick={() => control(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      {me?.isAdmin && (
        <Box className={style.controlField}>
          <Box className={style.controlTask}>
            <Typography color="secondary">Allow member send message</Typography>
            <Switch
              checked={room?.isAllowMessage}
              onClick={handleToogleAllowMessage}
            />
          </Box>
        </Box>
      )}
      <Box className={style.tipField}>
        <Typography color="secondary" className={style.tip}>
          {!me?.isAdmin
            ? !room?.isAllowMessage
              ? "You are not allow to send message. Contact with the admin to enable this feature."
              : `You can send your message to everyone. All messages will be deleted
            after the meet finish.`
            : `You can enable this feature for everyone to send message or block it`}
        </Typography>
      </Box>
      <Box className={style.messageBox}>
        <MessageBox />
      </Box>
      {(me?.isAdmin || (!me?.isAdmin && room?.isAllowMessage)) && (
        <form
          onSubmit={form.handleSubmit(submitMessage)}
          className={style.sendForm}
        >
          <TextInput
            autoComplete="off"
            className={style.msgInput}
            form={form}
            placeHolder="Type your message here"
            name="content"
            hideError
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </form>
      )}
    </Box>
  );
};

export default ChatBox;
