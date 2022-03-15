import { makeStyles } from "@mui/styles";
import { DrawType } from "utilities/drawUtil";

interface IProps {
  action: DrawType;
}

const getCursorType = (action: DrawType) => {
  switch (action) {
    case DrawType.PEN:
      return "url( https://ssl.gstatic.com/inputtools/images/pencil.png ), auto";
    case DrawType.TEXT:
      return "text";
    case DrawType.RECTANGLE:
    case DrawType.CIRCLE:
    case DrawType.LINE:
      return "crosshair";
    default:
      return "default";
  }
};

const useDrawBoxStyle = makeStyles({
  drawBox: {},
  canvas: (props: IProps) => ({
    backgroundColor: "#f9f9f9",
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

export default useDrawBoxStyle;
