import React from "react";
import { DrawType } from "utilities/drawUtil";
import rough from "roughjs/bundled/rough.esm";
import getStroke from "perfect-freehand";

const useDraw = () => {
  const createElement = (id, x1, y1, x2, y2, action, color) => {
    let generator;
    let roughElement;
    switch (action) {
      case DrawType.RECTANGLE:
        generator = rough.generator();
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
          stroke: color,
        });
        return { id, x1, y1, x2, y2, roughElement, type: action, color };
      case DrawType.CIRCLE:
        generator = rough.generator();
        let coreX = (x1 + x2) / 2;
        let coreY = (y1 + y2) / 2;
        let radius = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        roughElement = generator.circle(coreX, coreY, radius, {
          stroke: color,
        });
        return { id, x1, y1, x2, y2, roughElement, type: action, color };
      case DrawType.LINE:
        generator = rough.generator();
        roughElement = generator.line(x1, y1, x2, y2, {
          stroke: color,
        });
        return { id, x1, y1, x2, y2, roughElement, type: action, color };
      case DrawType.PEN:
        return { id, type: action, color, points: [{ x: x1, y: y1 }] };
    }
  };

  const updateElement = (id, x1, y1, x2, y2, containers, canvas, options) => {
    const elementsCopy = [...containers];
    const elementTarget = elementsCopy[id];
    switch (elementTarget.type) {
      case DrawType.LINE:
      case DrawType.RECTANGLE:
      case DrawType.CIRCLE:
        elementsCopy[id] = createElement(
          id,
          x1,
          y1,
          x2,
          y2,
          elementTarget.type,
          elementTarget.color
        );
        break;
      case DrawType.PEN:
        elementsCopy[id].points = [
          ...elementsCopy[id].points,
          { x: x2, y: y2 },
        ];
        break;
      default:
        break;
    }
    return elementsCopy;
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
        context.fillStyle = element.color;
        context.fill(new Path2D(stroke));
        break;
      case DrawType.TEXT:
        context.textBaseline = "top";
        context.font = "24px sans-serif";
        context.fillStyle = element.color;
        context.fillText(element.text, element.x1, element.y1);
        break;
      default:
        break;
    }
  };

  return { createElement, updateElement, drawElement };
};

export default useDraw;
