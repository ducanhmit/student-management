import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { classes } from "istanbul-lib-coverage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCityList, selectCityMap } from "../../city/citySlice";
import StudentFilters from "../components/StudentFilters";
import StudentTable from "../components/StudentTable";
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from "../studentSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: theme.spacing(2),
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },

  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

function ListPage(props) {
  const studentList = useSelector(selectStudentList);
  const pagination = useSelector(selectStudentPagination);
  const filter = useSelector(selectStudentFilter);
  const loading = useSelector(selectStudentLoading);
  const cityMap = useSelector(selectCityMap);
  const cityList = useSelector(selectCityList);

  const dispatch = useDispatch();
  const classes = useStyles();

  // console.log(cityMap)

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e, page) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter) => {
    const action = studentActions.setFilter(newFilter)
    console.log('City change action', action)
    dispatch(studentActions.setFilter(newFilter));
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Student</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Student Table */}
      <StudentTable studentList={studentList} cityMap={cityMap} />

      {/* Pagination */}
      <Box my={2} className={classes.paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination.page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default ListPage;
