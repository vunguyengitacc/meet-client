import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DrawType } from "utilities/drawUtil";
import rough from "roughjs/bundled/rough.esm";
import useDrawBoxStyle from "./style";
import { Box } from "@mui/material";
import DrawTool from "../DrawTool";
import getStroke from "perfect-freehand";
import whiteBoardApi from "api/whiteBoardApi";
import DrawControl from "../DrawControl";
import toast from "react-hot-toast";
import useHistory from "hooks/useHistory";
import { DrawControl as DrawControlType } from "utilities/drawUtil";
import { useSelector } from "react-redux";

const DrawBox = ({ board }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [action, setAction] = useState(DrawType.NONE);
  const [mouseDown, setMouseDown] = useState(false);
  const [onWriting, setOnWriting] = useState(false);
  const [elements, setElements] = useState(board.data);
  const [lastSave, setLastSave] = useState(board.data);
  const [currentEle, setCurrentEle] = useState(null);
  const [color, setColor] = useState("black");

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

  useEffect(() => {
    if (action === DrawType.TEXT && currentEle) {
      textAreaRef.current.focus();
    }
  }, [currentEle]);

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
        if (onWriting && currentEle?.id === element.id) return;
        drawElement(roughCanvas, context, element);
      });
    }
  }, [elements]);

  const createElement = (id, x1, y1, x2, y2) => {
    let generator;
    let roughElement;
    switch (action) {
      case DrawType.RECTANGLE:
        generator = rough.generator();
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
          stroke: color,
        });
        return { id, x1, y1, x2, y2, roughElement, type: action };
      case DrawType.CIRCLE:
        generator = rough.generator();
        let coreX = (x1 + x2) / 2;
        let coreY = (y1 + y2) / 2;
        let radius = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        roughElement = generator.circle(coreX, coreY, radius, {
          stroke: color,
        });
        return { id, x1, y1, x2, y2, roughElement, type: action };
      case DrawType.LINE:
        generator = rough.generator();
        roughElement = generator.line(x1, y1, x2, y2, {
          stroke: color,
        });
        return { id, x1, y1, x2, y2, roughElement, type: action };
      case DrawType.PEN:
        return { id, type: action, color, points: [{ x: x1, y: y1 }] };
      case DrawType.TEXT:
        setOnWriting(true);
        return { id, x1, y1, x2, y2, text: "", type: action, color };
    }
  };
  const updateElement = (id, x1, y1, x2, y2, options) => {
    const elementsCopy = [...elements];
    const elementTarget = elementsCopy[id];
    switch (elementTarget.type) {
      case DrawType.LINE:
      case DrawType.RECTANGLE:
      case DrawType.CIRCLE:
        elementsCopy[id] = createElement(id, x1, y1, x2, y2);
        break;
      case DrawType.PEN:
        elementsCopy[id].points = [
          ...elementsCopy[id].points,
          { x: x2, y: y2 },
        ];
        break;
      case DrawType.TEXT:
        if (options?.text) {
          const textWidth = canvasRef.current
            .getContext("2d")
            .measureText(options.text).width;
          const textHeight = 24;
          elementsCopy[id] = {
            ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight),
            text: options.text,
          };
        }
        break;
      default:
        break;
    }

    setElements(elementsCopy, true);
  };
  const getSvgPathFromStroke = (stroke) => {
    if (!stroke.length) return "";

    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ["M", ...stroke[0], "Q"]
    );

    d.push("Z");
    return d.join(" ");
  };
  const drawElement = (roughCanvas, context, element) => {
    switch (element?.type) {
      case DrawType.LINE:
      case DrawType.RECTANGLE:
      case DrawType.CIRCLE:
        roughCanvas.draw(element.roughElement);
        break;
      case DrawType.PEN:
        const stroke = getSvgPathFromStroke(
          getStroke(element.points, { size: 3 })
        );
        context.fill(new Path2D(stroke));
        break;
      case DrawType.TEXT:
        context.textBaseline = "top";
        context.font = "24px sans-serif";
        context.fillText(element.text, element.x1, element.y1);
        break;
      default:
        break;
    }
  };

  const mouseDownHandler = (e) => {
    if (
      currentUser._id === board.userId ||
      board.type === DrawControlType.EDIT
    ) {
      if (onWriting) return;
      const { clientX, clientY } = e;
      const id = elements.length;
      const ele = createElement(id, clientX, e.clientY, clientX, e.clientY);
      if (ele) {
        setElements([...elements, ele]);
        setCurrentEle(ele);
      }
      setMouseDown(true);
    }
  };

  const mouseMoveHandler = (e) => {
    if (
      mouseDown &&
      (currentUser._id === board.userId || board.type === DrawControlType.EDIT)
    ) {
      const { clientX, clientY } = e;
      const index = elements.length - 1;
      if (index >= 0 && currentEle && currentEle.type !== DrawType.TEXT) {
        const { x1, y1 } = elements[index];
        updateElement(index, x1, y1, clientX, clientY);
      }
    }
  };

  const mouseUpHandler = () => {
    setMouseDown(false);
    if (currentEle?.type === DrawType.TEXT) {
      setOnWriting(true);
    } else {
      setCurrentEle(null);
    }
    action !== DrawType.NONE && setState(elements);
  };

  const appenTextHandler = (e) => {
    const { id, x1, y1, type } = currentEle;
    setCurrentEle(null);
    updateElement(id, x1, y1, null, null, { text: e.target.value });
    e.target.value = "";
    setOnWriting(false);
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
      {action === DrawType.TEXT && currentEle && (
        <textarea
          className={style.floatingTextArea}
          ref={textAreaRef}
          onBlur={appenTextHandler}
          style={{
            top: currentEle?.y1 - 2 || 0,
            left: currentEle?.x1 || 0,
          }}
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
