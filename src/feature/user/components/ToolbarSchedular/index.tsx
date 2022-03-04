import { Box } from "@mui/material";
import SquareButton from "components/CustomUI/SquareButton";
import React from "react";
import useToolbarSchedularStyle from "./style";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { DateValue } from "utilities/dateUtils";
import { ViewType } from "../ScheduleBox";

interface IProps {
  currentDate: Date;
  setCurrentDate: (value: Date) => void;
  view: ViewType;
  setView: (value: ViewType) => void;
}

const ToolbarShedular: React.FC<IProps> = ({
  currentDate,
  setCurrentDate,
  view,
  setView,
}) => {
  const style = useToolbarSchedularStyle();

  const setNext = () => {
    if (view === ViewType.DAY)
      setCurrentDate(new Date(currentDate.getTime() + DateValue.DAY));
    else if (view === ViewType.WEEK)
      setCurrentDate(new Date(currentDate.getTime() + DateValue.WEEK));
    else if (view === ViewType.MONTH)
      setCurrentDate(new Date(currentDate.getTime() + DateValue.MONTH));
  };
  const setPrevious = () => {
    if (view === ViewType.DAY)
      setCurrentDate(new Date(currentDate.getTime() - DateValue.DAY));
    else if (view === ViewType.WEEK)
      setCurrentDate(new Date(currentDate.getTime() - DateValue.WEEK));
    else if (view === ViewType.MONTH)
      setCurrentDate(new Date(currentDate.getTime() - DateValue.MONTH));
  };

  return (
    <Box className={style.surface}>
      <Box display="flex" gap="10px">
        <SquareButton
          variant="contained"
          disableElevation
          onClick={setPrevious}
        >
          <ArrowLeftIcon />
        </SquareButton>
        <SquareButton
          variant="contained"
          color="info"
          onClick={() => setCurrentDate(new Date())}
          disableElevation
        >
          Now
        </SquareButton>
        <SquareButton variant="contained" disableElevation onClick={setNext}>
          <ArrowRightIcon />
        </SquareButton>
      </Box>
      <Box display="flex" gap="10px">
        <SquareButton
          variant={view === ViewType.DAY ? "contained" : "text"}
          onClick={() => setView(ViewType.DAY)}
        >
          Day
        </SquareButton>
        <SquareButton
          variant={view === ViewType.WEEK ? "contained" : "text"}
          onClick={() => setView(ViewType.WEEK)}
        >
          Week
        </SquareButton>
        <SquareButton
          variant={view === ViewType.MONTH ? "contained" : "text"}
          onClick={() => setView(ViewType.MONTH)}
        >
          Month
        </SquareButton>
      </Box>
    </Box>
  );
};

export default ToolbarShedular;
