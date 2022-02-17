import { makeStyles } from "@mui/styles";

interface IProps {
  counter: number;
  onPin: boolean;
  isShowTask: boolean;
}

const getRow = (input: number, onPin: boolean) => {
  let i = 0;
  if (onPin) return 5;
  while (true) {
    if (i <= input && i ** 2 >= input) return i;
    i++;
  }
};

const useMemberDisplayerStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  membersList: (props: IProps) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${getRow(props.counter, props.onPin)}, 1fr)`,
    gridTemplateRows: "auto",
    height: "100%",
    gridGap: "5px",
    padding: "5px",
    width: `${props.isShowTask ? "65%" : "100%"}`,
    transition: " width .15s",
  }),
  item: {
    height: "100%",
    overflow: "hidden",
  },
  pinItem: {
    gridColumn: "1 / end",
    gridRow: "1 /span 3",
  },
  break: {
    height: 0,
  },
  taskField: (props: IProps) => ({
    display: `${props.isShowTask ? "block" : "none"}`,
    width: "35%",
    height: "100%",
    margin: "5px",
  }),
});

export default useMemberDisplayerStyle;
