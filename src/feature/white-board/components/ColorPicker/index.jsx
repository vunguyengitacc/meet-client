import React from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ color, setColor }) => {
  return (
    <ChromePicker
      color={color}
      disableAlpha
      onChange={(fn) => setColor(fn.hex)}
    />
  );
};

export default ColorPicker;
