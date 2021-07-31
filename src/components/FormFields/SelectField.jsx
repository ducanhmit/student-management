import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import React from "react";
import { useController } from "react-hook-form";

SelectField.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

export function SelectField({ name, control, label, disabled, options }) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      disabled={disabled}
      margin="normal"
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
