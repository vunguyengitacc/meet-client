import * as yup from "yup";

const roomCreateScheme = yup
  .object()
  .shape({
    account: yup
      .string()
      .required("Please enter your account")
      .min(8, "Please enter at least 8 characters.")
      .max(20, "Please enter at most 20 characters"),
    password: yup
      .string()
      .required("Please enter password")
      .min(8, "Please enter at least 8 characters.")
      .max(20, "Please enter at most 20 characters"),
  })
  .required();

export interface IRoomCreateParams {
  account: string;
  password: string;
}

export default roomCreateScheme;
