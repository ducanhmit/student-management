import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { history } from "../utils";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import studentReducer from "../features/student/studentSlice"
import cityReducer from "../features/city/citySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  router: connectRouter(history),
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer
});


const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);
