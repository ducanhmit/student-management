import { Box, Button } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { RadioGroupField } from "../../../components/FormFields";
import { InputField } from "../../../components/FormFields/InputField";

function StudentForm({ initialValues = "", onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues) => {
    console.log('Submit:', formValues)
  }


  return (
      <Box maxWidth={350}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
               {/* Form FIELDS */}
               <InputField name='name' control={control} label='Full name' />
               <RadioGroupField name='gender' control={control} label='Gender' 
                options={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'},

                ]}
               />
               <InputField name='age' control={control} label='Age' type='number' />
               <InputField name='mark' control={control} label='Mark' type="number" />
               
               <InputField name='city' control={control} label='City' />

               <Box mt={3}>
                   <Button type='submit' variant='contained' color="primary">Save</Button>
               </Box>
          </form>
      </Box>
  )
}
 
export default StudentForm;

