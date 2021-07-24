import { func } from "prop-types"
import { call, put, takeLatest } from "redux-saga/effects"
import studentApi from "../../api/studentApi"
import { studentActions } from "./studentSlice"

function* fetchStudentList(action) {
    try {
        const response = yield call(studentApi.getAll, action.payload)
        yield put(studentActions.fetchStudentListSuccess(response))
    } catch (error) {
        console.log('Failed to fetch student list', error)
        yield put(studentActions.fetchStudentListFailed(error))
    }
}


export default function* studentSaga() {
    // watch fetch student action
    yield takeLatest(studentActions.fetchStudentList, fetchStudentList)
}