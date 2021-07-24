import { push } from "connected-react-router";
import { call, delay, fork, put, take, takeLatest } from "redux-saga/effects";
import { authActions } from "./authSlice";

function* handleLogin(payload) {
  try {
    yield delay(500);
    // call api
    localStorage.setItem("access_token", "safdf");
    yield put(authActions.loginSuccess());
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
  // redirect to admin page
  yield put(push('/admin/dashboard'))
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem("access_token");
  // redirect to login page
  yield put(push('/login'))
   
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action = yield take(authActions.login.type); // wait for action with type
      yield fork(handleLogin, action.payload); // execute a function
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
