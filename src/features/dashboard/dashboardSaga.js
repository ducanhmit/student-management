import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import cityApi from "../../api/cityApi";
import studentApi from "../../api/studentApi";
import { dashboardActions } from "./dashboardSlice";

function* fetchStatistics() {
  const responseList = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "male" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "female" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statisticList = responseList.map(x => x.pagination._totalRows)
  const [maleCount, femaleCount, highMarkcount, lowMarkCount] = statisticList
  yield put(
    dashboardActions.setStatistics({
      maleCount,
      femaleCount,
      highMarkcount,
      lowMarkCount,
    })
  );
}
function* fetchHighestStudentList() {
  const { data } = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  });

  yield put(dashboardActions.setHighestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data } = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "asc",
  });

  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCityList() {
    // Fetch city list
    const {data: cityList} = yield call(cityApi.getAll)

    // Fetch ranking per city
    const callList = cityList.map((x) => call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: "mark",
        _order: "desc",
        city: x.code
      }))

    const responseList = yield all(callList)
    const rankingByCityList = responseList.map((x,idx) => ({
        cityId: cityList[idx].code,
        cityName: cityList[idx].name,
        rankingList: x.data
    }))

    // Update state
    yield put(dashboardActions.setRankingByCityList(rankingByCityList))

}

function* fetchDashboardSaga() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);

    yield put(dashboardActions.fetchDataSuccess())
  } catch (error) {
    console.log("Failed to fetch dashboard data", error);
    yield put(dashboardActions.fetchDataFailed())
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardSaga);
}
