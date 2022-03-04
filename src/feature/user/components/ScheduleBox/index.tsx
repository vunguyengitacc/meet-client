import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Appointments,
  AppointmentTooltip,
  DayView,
  WeekView,
  MonthView,
  Resources,
  Scheduler,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Box, Paper } from "@mui/material";
import { orange, blue } from "@mui/material/colors";
import { AppDispatch, RootState } from "app/reduxStore";
import { getMyRoom } from "feature/auth/authSlice";
import { IUser } from "model/User";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToolbarShedular from "../ToolbarSchedular";
import useScheduleBoxStyle from "./style";

interface IParams {
  startDate: Date;
  endDate?: Date;
  title: string;
  type?: string;
}

const resorces = [
  {
    fieldName: "type",
    title: "Room type",
    instances: [
      { id: "type_1", text: "My room", color: blue },
      { id: "type_2", text: "Invitation", color: orange },
    ],
  },
];

export enum ViewType {
  MONTH = "Month",
  DAY = "Day",
  WEEK = "Week",
}

const ScheduleBox = () => {
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;
  const [data, setData] = useState<IParams[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.MONTH);

  const dispatch = useDispatch<AppDispatch>();
  const style = useScheduleBoxStyle();

  useEffect(() => {
    if (!currentUser.rooms) dispatch(getMyRoom());
  }, []);

  useEffect(() => {
    let temp = [] as IParams[];
    currentUser.rooms?.forEach((i) => {
      if (!i.startAt) return;
      temp.push({
        startDate: i.startAt,
        title: i.accessCode,
        endDate: i.finishAt,
        type: "type_1",
      });
    });
    setData(temp);
  }, [currentUser.rooms]);

  return (
    <Box className={style.surface}>
      <Paper className={style.schedule}>
        <Box className={style.toolbar}>
          <ToolbarShedular
            view={currentView}
            setView={setCurrentView}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </Box>
        <Scheduler data={data}>
          <ViewState
            defaultCurrentDate={new Date()}
            currentDate={currentDate}
            currentViewName={currentView}
          />
          <MonthView />
          <DayView startDayHour={7} endDayHour={22} cellDuration={60} />
          <WeekView startDayHour={7} endDayHour={22} cellDuration={60} />
          <Appointments />
          <AppointmentTooltip />
          <Resources data={resorces} />
        </Scheduler>
      </Paper>
    </Box>
  );
};

export default ScheduleBox;
