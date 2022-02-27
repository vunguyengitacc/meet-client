import {
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  SxProps,
} from "@mui/material";
import { toast } from "react-hot-toast";
import React, { ClipboardEvent, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IPasswordInputProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeHolder?: string;
  sx?: SxProps;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  fullWidth?: boolean;
  className?: string;
  errorClassName?: string;
  blockCopy?: boolean;
  blockPaste?: boolean;
  autoComplete?: string;
}

const PasswordInput: React.FC<IPasswordInputProps> = ({
  name,
  form,
  ...other
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const { errors } = form.formState;
  const hasError = !!errors[name];

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormControl
          variant="outlined"
          error={hasError}
          fullWidth={other.fullWidth}
          sx={{ width: "100%" }}
        >
          <>
            <InputBase
              sx={other.sx}
              onCopy={(e: ClipboardEvent) => {
                if (other.blockCopy) {
                  e.preventDefault();
                  toast.error("Copy is not allowed");
                }
              }}
              onPaste={(e: ClipboardEvent) => {
                if (other.blockPaste) {
                  e.preventDefault();
                  toast.error("Paste is not allowed");
                }
              }}
              fullWidth
              endAdornment={
                <IconButton
                  sx={{ padding: "0" }}
                  onClick={() => setIsHidden(!isHidden)}
                >
                  {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              }
              type={isHidden ? "password" : "text"}
              {...field}
              autoComplete={other.autoComplete}
              placeholder={other.placeHolder}
              className={`${other.className} ${
                hasError && other.errorClassName
              }`}
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
          </>
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;
