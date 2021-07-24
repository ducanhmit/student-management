import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkcount: 0,
        lowMarkCount: 0
    },
    highestStudentList: [],
    lowestStudentList: [],
    rankingByCityList: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // fetch API
        fetchData(state) {
            state.loading = true
        },
        fetchDataSuccess(state) {
            state.loading = false
        },
        fetchDataFailed(state) {},

        setStatistics(state, action) {
            state.statistics = action.payload
        },
        setHighestStudentList(state, action) {
            state.highestStudentList = action.payload
        },
        setLowestStudentList(state, action) {
            state.lowestStudentList = action.payload
        },
        setRankingByCityList(state, action) {
            state.rankingByCityList = action.payload
        },
    },

})


// Actions
export const dashboardActions = dashboardSlice.actions

// Selectors
export const selectDashboardLoading= (state) => state.dashboard.loading
export const selectDashboardStatistics = (state) => state.dashboard.statistics
export const selectHighestStudentList = (state) => state.dashboard.highestStudentList
export const selectLowestStudentList = (state) => state.dashboard.lowestStudentList
export const selectRankingStudentList = (state) => state.dashboard.rankingByCityList

// Reducers
const dashboardReducer = dashboardSlice.reducer
export default dashboardReducer