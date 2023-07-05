import { createSlice } from "@reduxjs/toolkit";
import stylesService from "../services/stylesService";

const stylesSlice = createSlice({
    name: "styles",
    initialState: {
        entities: null,
        loading: true
    },
    reducers: {
        resived(state, action) {
            state.entities = action.payload;
            state.loading = false;
        },
        requestFaild(state, action) {
            state.error = action.payload;
        },
        requested(state) {
            state.loading = true;
        }
    }
});

const { actions, reducer: stylesReducer } = stylesSlice;

const { resived, requested, requestFaild } = actions;

export const loadStyles = () => async(dispatch) => {
    dispatch(requested());
    try {
        const { data } = await stylesService.get();
        dispatch(resived(data));
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};

// selectors

export const getStylesSelector = () => (state) => state.styles.entities;

export const getStylesIsloadingSelector = () => (state) => state.styles.loading;

export default stylesReducer;
