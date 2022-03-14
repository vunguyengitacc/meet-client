import { makeStyles } from "@mui/styles";
import { DrawType } from "utilities/drawUtil";

interface IProps {
  action: DrawType;
}

const getCursorType = (action: DrawType) => {
  switch (action) {
    case DrawType.PEN:
      return "pointer";
    case DrawType.TEXT:
      return "text";
    default:
      return "default";
  }
};

const useDrawToolStyle = makeStyles({
  drawBox: {},
  canvas: (props: IProps) => ({
    backgroundColor: "white",
    cursor: getCursorType(props.action),
  }),
  floatingTextArea: {
    position: "fixed",
    backgroundColor: "transparent",
    font: "24px sans-serif",
    border: "none",
    outline: "none",
    resize: "none",
    padding: "0",
  },
});

export default useDrawToolStyle;
