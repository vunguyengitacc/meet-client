import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DrawType } from "utilities/drawUtil";
import rough from "roughjs/bundled/rough.esm";
import useDrawBoxStyle from "./style";
import { Box } from "@mui/material";
import DrawTool from "../DrawTool";
import whiteBoardApi from "api/whiteBoardApi";
import DrawControl from "../DrawControl";
import toast from "react-hot-toast";
import useHistory from "hooks/useHistory";
import { DrawControl as DrawControlType } from "utilities/drawUtil";
import { useSelector } from "react-redux";
import useDraw from "hooks/useDraw";

const DrawBox = ({ board }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [action, setAction] = useState(DrawType.NONE);
  const [mouseDown, setMouseDown] = useState(false);
  const [elements, setElements] = useState(board.data);
  const [lastSave, setLastSave] = useState(board.data);
  const [currentEle, setCurrentEle] = useState(null);
  const [color, setColor] = useState("#000000");
  const { createElement, updateElement, drawElement } = useDraw();

  useEffect(() => {
    setElements(board.data);
    if (
      board.type !== DrawControlType.EDIT &&
      currentUser._id !== board.userId
    ) {
      setCurrentEle(null);
      setAction(DrawType.NONE);
    }
  }, [board]);

  useEffect(() => {
    if (!mouseDown) whiteBoardApi.updateOne({ ...board, data: elements });
  }, [mouseDown]);

  const { setState, undo, redo } = useHistory([board.data]);
  const canvasRef = useRef(null);
  const textAreaRef = useRef(null);
  const style = useDrawBoxStyle({ action });

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      const roughCanvas = rough.canvas(canvasRef.current);
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      elements.forEach((element) => {
        drawElement(roughCanvas, context, element);
      });
    }
  }, [elements]);

  const mouseDownHandler = (e) => {
    if (
      currentUser._id === board.userId ||
      board.type === DrawControlType.EDIT
    ) {
      setMouseDown(true);    
      const { clientX, clientY } = e;
      const id = elements.length;
      const ele = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        action,
        color
      );
      if (ele) {
        setElements([...elements, ele]);
        setCurrentEle(ele);
      }
    }
  };

  const mouseMoveHandler = (e) => {
    if (
      mouseDown &&
      (currentUser._id === board.userId || board.type === DrawControlType.EDIT)
    ) {
      const { clientX, clientY } = e;
      const index = elements.length - 1;
      if (index >= 0 && currentEle ) {
        const { x1, y1 } = elements[index];
        let newUpdated = updateElement(
          index,
          x1,
          y1,
          clientX,
          clientY,
          elements,
          canvasRef.current
        );
        setElements(newUpdated);
      }
    }
  };

  const mouseUpHandler = () => {
    setMouseDown(false);
    setCurrentEle(null);
    action !== DrawType.NONE && setState(elements);
  };

  const onClear = () => {
    setElements([]);
  };

  const onSave = async () => {
    try {
      const { data } = await whiteBoardApi.updateOne({
        _id: board._id,
        data: elements,
      });
      toast.success("Success");
      setLastSave(data.updatedWhiteBoard.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onReset = () => {
    setElements(lastSave);
    whiteBoardApi.updateOne({ ...board, data: lastSave });
  };

  const onUndo = () => {
    const newState = undo();
    newState && setElements(newState);
    whiteBoardApi.updateOne({ ...board, data: newState });
  };

  const onRedo = () => {
    const newState = redo();
    newState && setElements(newState);
    whiteBoardApi.updateOne({ ...board, data: newState });
  };

  const exportHandler = (type, name) => {
    const canvas = canvasRef.current;
    let myImage = canvas.toDataURL(type);
    let downloadLink = document.createElement("a");
    downloadLink.download = `${name ?? board.name ?? board._id}.${
      type.split("/")[1]
    }`;
    downloadLink.href = myImage;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Box className={style.drawBox}>
      {(board.type === DrawControlType.EDIT ||
        currentUser._id === board.userId) && (
        <DrawTool
          action={action}
          setAction={setAction}
          color={color}
          setColor={setColor}
        />
      )}
      <canvas
        ref={canvasRef}
        className={style.canvas}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
      />
      {(board.type === DrawControlType.EDIT ||
        currentUser._id === board.userId) && (
        <DrawControl
          exportHandler={exportHandler}
          onClear={onClear}
          onSave={onSave}
          onReset={onReset}
          onUndo={onUndo}
          onRedo={onRedo}
        />
      )}
    </Box>
  );
};

export default DrawBox;
