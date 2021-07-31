const { createSlice, createSelector } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: "city",
  initialState: initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const cityActions = citySlice.actions;

// Selectors
export const selectCityList = (state) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
