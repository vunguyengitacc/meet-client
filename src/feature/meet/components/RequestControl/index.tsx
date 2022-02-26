import { Avatar, Box, Button, InputBase, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { answerRequest, requestsSelector } from "feature/meet/meetSlice";
import { AppDispatch, RootState } from "app/reduxStore";
import CheckIcon from "@mui/icons-material/Check";
import useRequestControlStyle from "./style";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IRequest } from "model/Request";
import { IRoom } from "model/Room";
import { RequestType } from "utilities/joinRequestTypeUtil";

interface IProps {
  control: (value: boolean) => void;
}

const RequestControl: React.FC<IProps> = ({ control }) => {
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const requests = useSelector((state: RootState) =>
    requestsSelector.selectAll(state)
  );
  const dispatch = useDispatch<AppDispatch>();
  const style = useRequestControlStyle();

  const handleAnswer = async (payload: {
    request: IRequest;
    answer: Partial<IRequest>;
  }) => {
    dispatch(
      answerRequest({
        room,
        ...payload,
      })
    );
  };

  return (
    <Box className={style.surface}>
      <Box className={style.headerField}>
        <Typography variant="h6">Request to join</Typography>
        <Button
          variant="contained"
          disableElevation
          color="error"
          onClick={() => control(false)}
        >
          <CloseIcon />
        </Button>
      </Box>
      <Box className={style.searchInput}>
        <InputBase
          startAdornment={
            <SearchIcon style={{ marginRight: "10px", color: "#dddddd" }} />
          }
          fullWidth
          placeholder="Filter by user's name"
        />
      </Box>
      <Box>
        {requests.length === 0 && (
          <Typography className={style.nonText}>Not any request</Typography>
        )}
        {requests.map((i) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="10px"
          >
            <Box display="flex" gap="10px" alignItems="center">
              <Avatar src={i.user?.avatarURI} />
              <Typography>{i.user?.fullname}</Typography>
            </Box>
            <Box display="flex" gap="10px" justifyContent="flex-end">
              <Button
                color="success"
                variant="contained"
                disableElevation
                onClick={() =>
                  handleAnswer({
                    request: i,
                    answer: { result: RequestType.accept },
                  })
                }
              >
                <CheckIcon />
              </Button>
              <Button
                color="warning"
                variant="contained"
                disableElevation
                onClick={() =>
                  handleAnswer({
                    request: i,
                    answer: { result: RequestType.reject },
                  })
                }
              >
                <DoDisturbOnIcon />
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Box display="flex" gap="10px" justifyContent="flex-end">
        <Button color="success" variant="contained" disableElevation>
          Accept All
        </Button>
        <Button color="warning" variant="contained" disableElevation>
          Reject All
        </Button>
      </Box>
    </Box>
  );
};

export default RequestControl;
