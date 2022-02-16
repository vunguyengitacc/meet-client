import { FormControl, FormHelperText, InputBase, SxProps } from "@mui/material";
import { toast } from "react-hot-toast";
import React, { ClipboardEvent } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface ITextInputProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeHolder?: string;
  sx?: SxProps;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  fullWidth?: boolean;
  className?: string;
  blockCopy?: boolean;
  blockPaste?: boolean;
  autoComplete?: string;
}

const TextInput: React.FC<ITextInputProps> = ({ name, form, ...other }) => {
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
              {...field}
              autoComplete={other.autoComplete}
              placeholder={other.placeHolder}
              className={other.className}
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
          </>
        </FormControl>
      )}
    />
  );
};

export default TextInput;
