import { createSlice } from "@reduxjs/toolkit";
import sizesService from "../services/sizes.service";

const sizesSlice = createSlice({
    name: "sizes",
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

const { actions, reducer: sizesReducer } = sizesSlice;

const { resived, requested, requestFaild } = actions;

export const loadSizes = () => async(dispatch) => {
    dispatch(requested());
    try {
        const data = await sizesService.get();
        dispatch(resived(data));
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};

// selectors

export const getSizesSelector = () => (state) => state.sizes.entities;

export const getSizesIsloadingSelector = () => (state) => state.sizes.loading;

export default sizesReducer;
