import { Box, Button, Divider, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent, TextField } from "@mui/material";
import { Typography, IconButton, InputAdornment } from "@mui/material";
import React, { useEffect } from "react";
import useRoomCreatorModalStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { DateTimePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import roomApi from "api/roomApi";
import toast from "react-hot-toast";
import { IRoom } from "model/Room";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import SquareButton from "components/CustomUI/SquareButton";
import { DateValue } from "utilities/dateUtils";

interface IProps {
  control: (value: boolean) => void;
}

const RoomCreatorModal: React.FC<IProps> = ({ control }) => {
  const style = useRoomCreatorModalStyle();
  const [startAt, setStartAt] = React.useState<Date>(new Date());
  const [finishAt, setFinishAt] = React.useState<Date | undefined>();
  const [newRoom, setNewRoom] = React.useState<IRoom | undefined>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isCopy, setIsCopy] = React.useState<boolean>(false);
  const [remindType, setRemindType] = React.useState<number>(0);
  const changeRemindTypeHandler = (event: SelectChangeEvent<number>) => {
    setRemindType(event.target.value as number);
  };

  useEffect(() => {
    setFinishAt(new Date(startAt.getTime() + DateValue.HOUR));
  }, [startAt]);

  const resetHandler = () => {
    setRemindType(0);
    setStartAt(new Date());
    setIsLoading(false);
  };

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await roomApi.create({ startAt, remindType, finishAt });
      setNewRoom(data.result.room);
    } catch (error: any) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  const copyClipboardHandler = () => {
    if (newRoom === undefined) return;
    navigator.clipboard.writeText(newRoom.accessCode);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 3000);
  };

  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <Typography variant="h6">Create room</Typography>
        <SquareButton
          variant="contained"
          disableElevation
          onClick={() => control(false)}
          color="error"
        >
          <CloseIcon />
        </SquareButton>
      </Box>
      {!newRoom ? (
        <>
          <Box className={style.form}>
            <Box display="flex" alignItems="center">
              <Typography className={style.formLbl}>Will start at</Typography>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DateTimePicker
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                  disablePast
                  value={startAt}
                  onChange={(newValue) => {
                    if (newValue) setStartAt(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Box>
              <Box display="flex" alignItems="center">
                <Typography className={style.formLbl}>Meet reminder</Typography>
                <Select
                  value={remindType}
                  onChange={changeRemindTypeHandler}
                  fullWidth
                  size="small"
                >
                  <MenuItem value={0}>
                    <em>Don't remind me</em>
                  </MenuItem>
                  <MenuItem value={1}>Before 5 minutes</MenuItem>
                  <MenuItem value={2}>Before 30 minutes</MenuItem>
                  <MenuItem value={3}>Before 1 hour</MenuItem>
                </Select>
              </Box>
              <Box marginLeft="30%">
                <i>
                  *Check your email or account's notification to see the
                  reminder
                </i>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography className={style.formLbl}>Might finish at</Typography>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DateTimePicker
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                  disablePast
                  value={finishAt}
                  onChange={(newValue) => {
                    if (newValue) setFinishAt(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          <Divider light />
          <Box className={style.submit}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              disableElevation
              onClick={submitHandler}
            >
              Submit
            </LoadingButton>
            <Button
              color="inherit"
              variant="contained"
              disableElevation
              onClick={resetHandler}
            >
              Reset
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box className={style.form}>
            <Box display="flex" alignItems="center">
              <Typography className={style.formLbl}>
                Your new Room is
              </Typography>
              <TextField
                size="small"
                value={newRoom.accessCode}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!isCopy ? (
                        <IconButton
                          color="primary"
                          onClick={copyClipboardHandler}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      ) : (
                        <IconButton color="success">
                          <CheckIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RoomCreatorModal;
