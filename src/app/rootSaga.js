import { authSaga } from "../features/auth/authSaga";
import {all} from 'redux-saga/effects'
import dashboardSaga from "../features/dashboard/dashboardSaga";
import studentSaga from "../features/student/studentSaga";



export default function* rootSaga() {
    yield all([
        authSaga(),
        dashboardSaga(),
        studentSaga()
    ])
}