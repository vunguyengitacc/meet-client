import { makeStyles } from "@mui/styles";

interface IProps {
  counter: number;
}

const getRow = (input: number) => {
  let i = 0;
  while (true) {
    console.log(i, input);
    if (i <= input && i ** 2 >= input) return i;
    i++;
  }
};

const useMemberDisplayerStyle = makeStyles({
  surface: (props: IProps) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${getRow(props.counter)}, 1fr)`,
    gridTemplateRows: "auto",
    height: "100%",
    gridGap: "5px",
    padding: "5px",
  }),
  item: {
    height: "100%",
    overflow: "hidden",
  },
  break: {
    height: 0,
  },
});

export default useMemberDisplayerStyle;
