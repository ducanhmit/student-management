import { Box, Typography } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import studentApi from "../../../api/studentApi";

function AddEditPage(props) {
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

  console.log("Found student:", student);

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
    </Box>
  );
}

export default AddEditPage;
