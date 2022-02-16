import * as yup from "yup";

const registerScheme = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("Please enter username")
      .min(8, "Please enter at least 8 characters.")
      .max(20, "Please enter at most 20 characters"),
    password: yup
      .string()
      .required("Please enter password")
      .min(8, "Please enter at least 8 characters.")
      .max(20, "Please enter at most 20 characters"),
    email: yup.string(),
    fullname: yup
      .string()
      .required("Please enter your name")
      .min(2, "Please enter at least 2 characters.")
      .max(50, "Please enter at most 50 characters"),
    confirm: yup
      .string()
      .required("Please retype your password to confirm.")
      .oneOf([yup.ref("password")], "Must match password"),
  })
  .required();

export interface IRegisterParams {
  username: string;
  password: string;
  email?: string;
  fullname: string;
  confirm: string;
}

export default registerScheme;
