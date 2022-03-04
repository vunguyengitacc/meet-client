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
  view?: ViewType;
}

const ToolbarShedular: React.FC<IProps> = ({ currentDate, setCurrentDate }) => {
  const style = useToolbarSchedularStyle();
  return (
    <Box className={style.surface}>
      <Box display="flex" gap="10px">
        <SquareButton
          variant="contained"
          disableElevation
          onClick={() =>
            setCurrentDate(new Date(currentDate.getTime() - DateValue.MONTH))
          }
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
        <SquareButton
          variant="contained"
          disableElevation
          onClick={() =>
            setCurrentDate(new Date(currentDate.getTime() + DateValue.MONTH))
          }
        >
          <ArrowRightIcon />
        </SquareButton>
      </Box>
      <Box display="flex" gap="10px">
        <SquareButton>Day</SquareButton>
        <SquareButton>Week</SquareButton>
        <SquareButton>Month</SquareButton>
      </Box>
    </Box>
  );
};

export default ToolbarShedular;
