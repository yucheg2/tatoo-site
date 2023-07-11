import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import mastersService from "../services/masters.service";
import userServuse from "../services/users.servise";
import createErrorMessage from "../utils/createErrorMessage";
import { loadCurrentUser } from "./users";

export const takeOrder = createAsyncThunk(
    "masters/takeOrder",
    async function({ tatoos, orderData }, { rejectWithValue, getState, dispatch }) {
        const { currentUser } = getState().users;
        const sendData = (toMaster) => ({
            date: orderData.date,
            order: JSON.stringify(tatoos),
            person: toMaster ? currentUser : orderData.master
        });
        try {
            Promise.all([userServuse.takeOrder(currentUser._id, sendData(false)),
                mastersService.takeOrder(orderData.master, sendData(true))])
                .then((data) => {
                    const issue = data.find((res) => typeof (res) === "string");
                    if (issue) {
                        toast.error(issue);
                        if (!(data.every((res) => typeof (res) === "string"))) {
                            if (issue === "Мастер в этот день зянят.") {
                                userServuse.clearOrder(currentUser._id, orderData.date);
                            } else {
                                mastersService.clearOrder(orderData.master, orderData.date);
                            }
                        }
                    } else {
                        toast.success("Вы записаны на сеанс!", { position: "bottom-right", theme: "dark" });
                        dispatch(loadCurrentUser());
                    }
                });
        } catch (error) {
            return rejectWithValue(createErrorMessage(error));
        }
    }
);

export const updateRate = createAsyncThunk(
    "masters/updateRate",
    async function({ rate, masterId }, { getState, rejectWithValue }) {
        const masters = getState().masters.entities;

        const master = Object.values(masters).find((m) => {
            return m._id === masterId;
        });
        const newRate = Math.ceil((master.rate + rate) / 2);
        try {
            await mastersService.updateRate(masterId, newRate);
            return ({ id: masterId, rate: newRate });
        } catch (error) {
            return rejectWithValue(createErrorMessage(error));
        }
    }
);

const mastersSlice = createSlice({
    name: "masters",
    initialState: {
        error: null,
        entities: null,
        loading: {
            masters: true,
            updateRate: false,
            orderWaiting: false
        }
    },
    reducers: {
        requested(state) {
            state.loading.masters = true;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.loading.masters = false;
        },
        requestFaild(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(takeOrder.pending, (state) => {
                state.loading.orderWaiting = true;
            })
            .addCase(takeOrder.fulfilled, (state) => {
                state.loading.orderWaiting = false;
            })
            .addCase(takeOrder.rejected, (state, action) => {
                state.loading.orderWaiting = false;
                state.error = action.payload;
            })
            .addCase(updateRate.pending, (state) => {
                state.loading.updateRate = true;
            })
            .addCase(updateRate.fulfilled, (state, action) => {
                const { id, rate } = action.payload;
                const master = state.entities.find(m => m._id === id);
                master.rate = rate;
                state.loading.updateRate = false;
            })
            .addCase(updateRate.rejected, (state, action) => {
                state.error = action.payload;
                state.loading.updateRate = false;
            });
    }
});

const { actions, reducer: mastersReducer } = mastersSlice;

const {
    requested,
    resived,
    requestFaild
} = actions;

export const loadMasters = () => async(dispatch) => {
    dispatch(requested());
    try {
        const data = await mastersService.get();
        dispatch(resived(data));
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};

// не забудь добавить лоадеры в кнопках с асинхронными запросами

// selectors

export const getMasterByIdSelector = (id) => (state) => state.masters.entities && state.masters.entities[id];

export const getMastersListSelectors = () => (state) => state.masters.entities;

export const getMasterLoadingStatusSelector = () => (state) => state.masters.loading.masters;

export const getWaitingStatusSelector = () => (state) => state.masters.loading.orderWaiting;

export default mastersReducer;
