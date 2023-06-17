import { createSlice } from "@reduxjs/toolkit";
import placesService from "../services/placesService";

const placesSlice = createSlice({
    name: "places",
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

const { actions, reducer: placesReducer } = placesSlice;

const { resived, requested, requestFaild } = actions;

export const loadPlaces = () => async(dispatch) => {
    dispatch(requested());
    try {
        const { data } = await placesService.get();
        dispatch(resived(data));
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};

// selectors

export const getPlacesSelector = () => (state) => state.places.entities;

export const getPlacesIsloadingSelector = () => (state) => state.places.loading;

export default placesReducer;
