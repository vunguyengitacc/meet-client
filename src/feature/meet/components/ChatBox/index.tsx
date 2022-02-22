import { Box, IconButton, InputBase, Switch, Typography } from "@mui/material";
import React from "react";
import useChatBoxStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "app/reduxStore";
import { useForm } from "react-hook-form";
import messageScheme, { IMessageParams } from "./form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import TextInput from "components/Input/TextInput";
import SendIcon from "@mui/icons-material/Send";
import messageApi from "api/messageApi";

interface IProps {
  control: (value: boolean) => void;
}

const ChatBox: React.FC<IProps> = ({ control }) => {
  const { room, me } = useSelector((state: RootState) => state.meet);
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
      if (me === undefined) return;
      await messageApi.create({ member: me, message: data });
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
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
            <Switch checked={room?.isAccessMessage} />
          </Box>
        </Box>
      )}
      <Box className={style.tipField}>
        <Typography color="secondary" className={style.tip}>
          You can send your message to everyone. All messages will be deleted
          after the meet finish.
        </Typography>
      </Box>
      <Box className={style.messageBox}>Message Box</Box>
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
        <IconButton>
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatBox;
