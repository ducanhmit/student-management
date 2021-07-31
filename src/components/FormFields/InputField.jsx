import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { TextField } from "@material-ui/core";

InputField.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.string,
};

export function InputField({ name, control, label, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin='normal'
      value={value}
      onChange={onChange}
      label={label}
      variant="outlined"
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
