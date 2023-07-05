import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { localStorageService, setTokens } from "../services/localstorage.service";
import mastersService from "../services/mastersService";
import userServuse from "../services/users.servise";
import createErrorMessage from "../utils/createErrorMessage";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

export const signIn = createAsyncThunk(
    "users/signin",
    async function(payload, { dispatch, rejectWithValue }) {
        dispatch(authRequested());
        const url = "accounts:signInWithPassword";
        try {
            const { data } = await httpAuth.post(url, { ...payload, returnSecureToken: true });
            setTokens(data);
            const content = await userServuse.getById(data.localId);
            return content;
        } catch (error) {
            return rejectWithValue(createErrorMessage(error));
        }
    }
);

export const cancelOrder = createAsyncThunk(
    "users/cancelOrder",
    async function({ orderData, txt }, { getState, rejectWithValue }) {
        const { currentUser } = getState().users;
        const newObj = {};
        try {
            await Promise.all([
                userServuse.clearOrder(currentUser._id, orderData.date),
                mastersService.clearOrder(orderData.master, orderData.date)
            ]).then(() => {
                Object.keys(currentUser.order).forEach((date) => {
                    if (date !== orderData.date) {
                        newObj[date] = currentUser.order[date];
                    };
                });
                toast.dark(txt);
            });
            return newObj;
        } catch (error) {
            return rejectWithValue(createErrorMessage(error));
        }
    }
);

export const signUp = createAsyncThunk(
    "users/signUp",
    async function({ email, password, ...rest }, { rejectWithValue }) {
        const url = "accounts:signUp";
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            const content = await userServuse.create({
                _id: data.localId,
                email,
                ...rest
            });
            return content;
        } catch (error) {
            return rejectWithValue(createErrorMessage(error));
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState: {
        loading: {
            authLoading: false,
            editLoading: false,
            orderLoading: false
        },
        currentUser: null,
        error: {
            auth: {},
            edit: {},
            cancelOrder: {}
        }
    },
    reducers: {
        authRequested(state) {
            state.loading.authLoading = true;
        },
        authRequestSuccess(state, action) {
            state.currentUser = action.payload;
            state.loading.authLoading = false;
        },
        authRequestFaild(state, action) {
            state.error.auth = { ...action.payload };
        },
        editRequested(state) {
            state.loading.editLoading = true;
        },
        editRequestSuccess(state, action) {
            state.currentUser = action.payload;
            state.loading.editLoading = false;
        },
        editRequestFaild(state, action) {
            state.error.edit = action.payload;
            state.loading.editLoading = false;
        },
        orderCanceled(state, action) {
            state.currentUser.order = action.payload;
            state.loading.orderLoading = false;
        },
        orderCanceleFaild(state, action) {
            state.error.cancelOrder = { ...action.payload };
        },
        userQuited(state) {
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.error.auth = {};
                state.loading.authLoading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.error.edit = {};
                state.currentUser = action.payload;
                state.loading.authLoading = false;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error.auth = { ...action.payload };
                state.loading.authLoading = false;
            })
            .addCase(
                cancelOrder.pending, (state) => {
                    state.loading.orderLoading = true;
                }
            )
            .addCase(
                cancelOrder.fulfilled, (state, action) => {
                    state.currentUser.order = action.payload;
                    state.loading.orderLoading = false;
                }
            )
            .addCase(cancelOrder.rejected, (state, action) => {
                state.error.cancelOrder = { ...action.payload };
                state.loading.orderLoading = false;
            })
            .addCase(signUp.pending, (state) => {
                state.error.auth = {};
                state.loading.authLoading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading.authLoading = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error.auth = { ...action.payload };
                state.loading.authLoading = false;
            });
    }
});

const { reducer: usersReducer, actions } = usersSlice;

const {
    authRequested,
    authRequestSuccess,
    authRequestFaild,
    editRequested,
    editRequestSuccess,
    editRequestFaild,
    userQuited
} = actions;

export const edit = (newData, emailChanged) => async(dispatch, getState) => {
    const url = "accounts:update";
    const { currentUser } = getState().users;
    const payload = { ...currentUser, ...newData };
    const accessToken = localStorageService.getAccessTokent();
    dispatch(editRequested());
    try {
        if (emailChanged) {
            const { data } = await httpAuth.post(url, { idToken: accessToken, email: payload.email, returnSecureToken: true });
            setTokens(data);
        }
        await userServuse.edit(payload);
        dispatch(editRequestSuccess(payload));
        toast.success("Данные изменены!");
    } catch (error) {
        dispatch(editRequestFaild(createErrorMessage(error)));
    }
};

export const signOut = () => (dispatch) => {
    localStorageService.deleteTokens();
    localStorage.removeItem("store");
    dispatch(userQuited());
};

export const loadCurrentUser = () => async(dispatch) => {
    const id = localStorageService.getUserId();
    if (id) {
        dispatch(authRequested());
        try {
            const user = await userServuse.getById(id);
            dispatch(authRequestSuccess(user));
        } catch (error) {
            dispatch(authRequestFaild(createErrorMessage(error)));
        }
    }
};

// selectors

export const getCurrentUserSelector = () => (state) => state.users.currentUser;

export const getEditErrorsSelector = () => (state) => state.users.error.edit;

export default usersReducer;
