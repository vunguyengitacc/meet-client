import * as yup from "yup";

const changePassScheme = yup
  .object()
  .shape({
    currentPassword: yup
      .string()
      .required("Please enter your current password")
      .min(8, "Please enter at least 8 characters.")
      .max(20, "Please enter at most 20 characters"),
    newPassword: yup
      .string()
      .required("Please enter your new password")
      .min(8, "Please enter at least 8 characters.")
      .max(20, "Please enter at most 20 characters"),
    confirmPassword: yup
      .string()
      .required("Please retype your password to confirm.")
      .oneOf([yup.ref("newPassword")], "Must match password"),
  })
  .required();

export interface IChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default changePassScheme;
