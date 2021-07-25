const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 15,
        name_like: ''
    },
    pagination: {
        _page: 1,
        _limit: 15,
        _totalRows: 15
    }
}

const studentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers: {
        fetchStudentList(state, action) {
            state.loading = true
        },
        fetchStudentListSuccess(state, action) {
            state.loading = false
            state.list = action.payload.data
            state.pagination = action.payload.pagination
        },
        fetchStudentListFailed(state) {
            // Do nothing
            state.loading = false
        },
        setFilter(state, action) {
            state.filter = action.payload
        },
        setFilterWithDebounce(state, action) {}
    }
})

// Actions
export const studentActions = studentSlice.actions

// Selectors
export const selectStudentList = (state) => state.student.list
export const selectStudentLoading = (state) => state.student.loading
export const selectStudentFilter = (state) => state.student.filter
export const selectStudentPagination= (state) => state.student.pagination

// Reducer
const studentReducer = studentSlice.reducer
export default studentReducer