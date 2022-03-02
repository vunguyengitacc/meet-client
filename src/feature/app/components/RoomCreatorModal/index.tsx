import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useRoomCreatorModalStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";

interface IProps {
  control: (value: boolean) => void;
}

const RoomCreatorModal: React.FC<IProps> = ({ control }) => {
  const style = useRoomCreatorModalStyle();
  const [startAt, setStartAt] = React.useState<Date | null>(new Date());
  const [remindType, setRemindType] = React.useState<number>(0);
  const changeRemindTypeHandler = (event: SelectChangeEvent<number>) => {
    setRemindType(event.target.value as number);
  };
  const resetHandler = () => {
    setRemindType(0);
    setStartAt(new Date());
  };
  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <Typography variant="h6">Create room</Typography>
        <Button
          variant="contained"
          disableElevation
          onClick={() => control(false)}
          color="error"
        >
          <CloseIcon />
        </Button>
      </Box>
      <Box className={style.form}>
        <Box display="flex" alignItems="center">
          <Typography className={style.formLbl}>The meet start at </Typography>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DateTimePicker
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
              disablePast
              value={startAt}
              onChange={(newValue) => {
                setStartAt(newValue);
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
              *Check your email or account's notification to see the reminder
            </i>
          </Box>
        </Box>
      </Box>
      <Divider light />
      <Box className={style.submit}>
        <Button variant="contained" disableElevation>
          Save
        </Button>
        <Button
          color="inherit"
          variant="contained"
          disableElevation
          onClick={resetHandler}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default RoomCreatorModal;
