import { createSlice } from "@reduxjs/toolkit";
import tattoosService from "../services/tattoos.servase";

const tatoosSlice = createSlice({
    name: "tatoos",
    initialState: {
        entities: null,
        loading: true,
        error: null
    },
    reducers: {
        resived(state, action) {
            state.entities = Object.values(action.payload);
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

const { actions, reducer: tatoosReducer } = tatoosSlice;

const { resived, requested, requestFaild } = actions;

export const loadTatoos = () => async(dispatch) => {
    dispatch(requested());
    try {
        const data = await tattoosService.get();
        dispatch(resived(data));
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};

// selectors

export const getTatoosSelector = () => (state) => state.tatoos.entities;

export const getTatoosIsloadingSelector = () => (state) => state.tatoos.loading;

export const getTatooInStorageSelector = () => (state) => {
    const storage = localStorage.getItem("store");
    const isLoading = state.tatoos.loading;
    const tatoos = state.tatoos.entities;

    const addTatoos = storage && !isLoading && JSON.parse(storage).map((t) => {
        if (t.isSelfMade) {
            return { ...t };
        }
        const item = { ...tatoos.find((tatoo) => tatoo.src === t.src) };
        item._id = t._id;
        item.place = t.place;
        return item;
    });

    return addTatoos || [];
};

export default tatoosReducer;
