import { createSlice } from "@reduxjs/toolkit";

const getNavCount = () => {
    const store = localStorage.getItem("store");
    return store && JSON.parse(store).length;
};

const countsSlice = createSlice({
    name: "counts",
    initialState: {
        navCount: getNavCount()
    },
    reducers: {
        navCountIncremented(state) {
            state.navCount += 1;
        },
        navCountDicremented(state) {
            state.navCount -= 1;
        },
        navCountCleared(state) {
            state.navCount = 0;
        }
    }
});

const { reducer: countsReducer, actions } = countsSlice;

const {
    navCountCleared,
    navCountDicremented,
    navCountIncremented
} = actions;

export const dicrementNavCount = () => (dispatch) => {
    dispatch(navCountDicremented());
};

export const incrementNavCount = () => (dispatch) => {
    dispatch(navCountIncremented());
};

export const clearNavCount = () => (dispatch) => {
    dispatch(navCountCleared());
};

// selectors

export const getNavCountSelector = () => (state) => state.counts.navCount;

export default countsReducer;
