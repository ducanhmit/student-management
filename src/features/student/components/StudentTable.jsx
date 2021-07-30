import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableRow,
} from "@material-ui/core";
import { capitalizeString, getMarkColor } from "../../../utils";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}) {
  const history = useHistory()
  const match = useRouteMatch()
  // console.log(cityMap)
  const classes = useStyles();

  const [open, setOpen] =  useState(false);
  const [selectedStudent, setSelectedStudent] = useState()

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student) => {
    // set selected student
    setSelectedStudent(student)
    // show confirm dialog
    setOpen(true)
  };
  
  const handleRemoveConfirm = (student) => {
    // call onRemove
    onRemove?.(student)
    // hide dialog
    setOpen(false)
  }

  const handleEditStudent = async (student) => {
    history.push(`${match.url}/${student.id}`)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={310}>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.edit}
                    size="small"
                    color="primary"
                    onClick={() => handleEditStudent(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* // Student Remove Diaglog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named {selectedStudent?.name}. <br />This action can not be undo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant='outlined'>
            Cancel
          </Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent)} color="secondary" variant='contained' autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
