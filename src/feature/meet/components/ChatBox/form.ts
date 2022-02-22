import * as yup from "yup";

const messageScheme = yup
  .object()
  .shape({
    content: yup
      .string()
      .required("Please enter your message")
      .max(200, "Please enter at most 200 characters"),
  })
  .required();

export interface IMessageParams {
  content: string;
}

export default messageScheme;
