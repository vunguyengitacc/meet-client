import * as yup from "yup";

const updateMeScheme = yup
  .object()
  .shape({
    email: yup.string().max(50, "Please enter at most 50 characters"),
    fullname: yup
      .string()
      .required("Please enter your name")
      .min(2, "Please enter at least 2 characters.")
      .max(50, "Please enter at most 50 characters"),
    address: yup.string().max(50, "Please enter at most 50 characters"),
    phone: yup.string().length(10, "Please enter 10 number"),
  })
  .required();

export default updateMeScheme;
