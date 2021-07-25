import { call, put, takeLatest } from "redux-saga/effects";
import cityApi from "../../api/cityApi";
import { cityActions } from "./citySlice";


function* fetchCityList() {
    try {
        const response = yield call(cityApi.getAll)
        yield put(cityActions.fetchCityListSuccess(response))
    } catch (error) {
        console.log('Failed to fetch city', error)
        yield put(cityActions.fetchCityListFailed())
    }
}

export default function* citySaga() {
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList)
} 