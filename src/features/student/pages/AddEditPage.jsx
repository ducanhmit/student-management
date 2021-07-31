import { Box, Typography } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import studentApi from "../../../api/studentApi";
import StudentForm from "../components/StudentForm";

function AddEditPage(props) {
  const history = useHistory();
  const { studentId } = useParams();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState();

  useEffect(() => {
    if (!studentId) return;
    // IFFE
    (async () => {
      try {
        const data = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues) => {
    //TODO: handle submit
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    // Toast success
    toast.success('Save student successfully!')

    // Redirect back to student list
    history.push("/admin/students");
  };

  const initialValues = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  };

  return (
    <Box>
      <Link to="/admin/students">
        <Typography
          variant="caption"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ChevronLeft />
          &nbsp;Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">
        {isEdit ? "Update student info" : "Add new student"}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}

export default AddEditPage;
