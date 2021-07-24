import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import StatisticItem from "./components/StatisticItem";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingStudentList,
} from "./dashboardSlice";
import {
  BubbleChartOutlined,
  ChatTwoTone,
  PeopleTwoTone,
} from "@material-ui/icons";
import Widget from "./components/Widget";
import StudentRankingList from "./components/StudentRankingList";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

function Dashboard(props) {
  const dispatch = useDispatch();
  const loading = useSelector(selectDashboardLoading);
  const statistics = useSelector(selectDashboardStatistics);
  const highestStudentList = useSelector(selectHighestStudentList);
  const lowestStudentList = useSelector(selectLowestStudentList);
  const rankingByCityList = useSelector(selectRankingStudentList);

  const classes = useStyles();

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <div>
      <Box className={classes.root}>
        {/* loading */}
        {loading && <LinearProgress className={classes.loading} />}

        <Grid container spacing={3}>
          {/* Statistic Section  */}
          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<PeopleAltIcon fontsize="large" color="primary" />}
              label="male"
              value={statistics.maleCount}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<PeopleTwoTone fontsize="large" color="primary" />}
              label="female"
              value={statistics.femaleCount}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<BubbleChartOutlined fontsize="large" color="primary" />}
              label="mark >= 8"
              value={statistics.highMarkcount}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<ChatTwoTone fontsize="large" color="primary" />}
              label="mark <= 5"
              value={statistics.lowMarkCount}
            />
          </Grid>
        </Grid>

        {/* All students rankings */}
        <Box mt={5}>
          <Typography variant="h4">All Students</Typography>
 
          <Box mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <Widget title="Student with highest mark">
                  <StudentRankingList studentList={highestStudentList} />
                </Widget>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Widget title="Student with lowest mark">
                  <StudentRankingList studentList={lowestStudentList} />
                </Widget>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Ranking by city */}
        <Box mt={5}>
          <Typography variant="h4">Ranking by city</Typography>
 
          <Box mt={2}>
            <Grid container spacing={3}>
              {rankingByCityList.map((ranking) => (
                <Grid item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
