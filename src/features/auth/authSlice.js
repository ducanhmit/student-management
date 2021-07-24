import { createSlice } from "@reduxjs/toolkit";


// const initialState
const initialState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.logging = true
        },
        loginSuccess(state, action) {
            state.logging = false
            state.isLoggedIn = true
            state.currentUser = action.payload
        },
        loginFailed(state, action) {
            state.logging = false
        },
        logout(state){
            state.isLoggedIn = false
            state.currentUser = undefined
        }
    }
})


// actions
export const authActions = authSlice.actions

// selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectIsLogging = (state) => state.auth.logging

// reducers
const authReducer = authSlice.reducer
export default authReducer



