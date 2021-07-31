import { Box, Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RadioGroupField, SelectField } from "../../../components/FormFields";
import { InputField } from "../../../components/FormFields/InputField";
import { selectCityOptions } from "../../city/citySlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "@material-ui/lab/Alert";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter name")
    .test("two-words", "Please enter at least two words", (value) => {
      if (!value) return true;

      const parts = value?.split(" ") || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  age: yup
    .number()
    .positive("Please enter a positive number")
    .min(16, "Min is 16")
    .max(80, "Max is 80")
    .integer("Please enter an integer")
    .required("Please enter age.")
    .typeError("Please enter a valid number"),
  mark: yup
    .number()
    .min(0, "Min is 0")
    .max(10, "Max is 10")
    .positive("Please enter a positive number")
    .required("Please enter mark.")
    .typeError("Please enter a valid number"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Please select either male or female"),
  city: yup.string().required("Please select a  city."),
});

function StudentForm({ initialValues = "", onSubmit }) {
  const cityOptions = useSelector(selectCityOptions);
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues) => {
    try {
      // clear previous submission error
      setError("");
      await onSubmit?.(formValues);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Form FIELDS */}
        <InputField name="name" control={control} label="Full name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField
            name="city"
            control={control}
            label="City"
            options={cityOptions}
          />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default StudentForm;
