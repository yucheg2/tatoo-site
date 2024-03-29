import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageService } from "../services/localstorage.service";
import selfMadeService from "../services/selfMade.service";
import tattoosService from "../services/tattoos.servase";
import createErrorMessage from "../utils/createErrorMessage";

export const upload = createAsyncThunk(
    "tatoos/upload",
    async function({ currentUser, styles, sizes, data }, { rejectWithValue }) {
        try {
            const store = localStorage.getItem("store");

            const src = await selfMadeService.loadToStorage(currentUser._id);
            const sendData = {
                src,
                style: styles.find((el) => el._id === data.style).name,
                _id: data.src + data.place + Date.now(),
                place: data.place,
                size: sizes.find((el) => el._id === data.size),
                isSelfMade: true
            };
            if (store) {
                const newArr = JSON.parse(store);
                if (!newArr.some((item) => (item.places === sendData.place && sendData.src === item.src))) {
                    localStorage.setItem("store", JSON.stringify([...newArr, sendData]));
                }
            } else {
                localStorage.setItem("store", JSON.stringify([sendData]));
            }
        } catch (error) {
            rejectWithValue(createErrorMessage(error));
        }
    }
);

const tatoosSlice = createSlice({
    name: "tatoos",
    initialState: {
        entities: null,
        loading: {
            entities: true,
            upload: false,
            create: false,
            edit: false
        },
        error: null
    },
    reducers: {
        tatooCreateRequested(state) {
            state.loading.create = true;
        },
        tatoCreated(state) {
            state.loading.create = false;
        },
        tatooEditRequested(state) {
            state.loading.edit = true;
        },
        tatooEdited(state) {
            state.loading.edit = false;
        },
        resived(state, action) {
            state.entities = Object.values(action.payload);
            state.loading.entities = false;
        },
        requestFaild(state, action) {
            state.error = action.payload;
        },
        requested(state) {
            state.loading.entities = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(upload.pending, (state) => {
                state.loading.upload = true;
            })
            .addCase(upload.fulfilled, (state) => {
                state.loading.upload = false;
            })
            .addCase(upload.rejected, (state, action) => {
                state.error = action.payload;
                state.loading.upload = false;
            });
    }
});

const { actions, reducer: tatoosReducer } = tatoosSlice;

const {
    resived,
    requested,
    requestFaild,
    tatooCreateRequested,
    tatoCreated,
    tatooEditRequested,
    tatooEdited
} = actions;

export const loadTatoos = () => async(dispatch) => {
    dispatch(requested());
    try {
        const data = await tattoosService.get();
        dispatch(resived(data));
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};

export const createNewTatoo = (sizes, styles, data) => async(dispatch) => {
    dispatch(tatooCreateRequested());
    try {
        const sendData = {
            ...data,
            size: sizes.find((s) => s._id === data.size),
            style: styles.find((el) => el._id === data.style).name
        };
        await tattoosService.create(sendData);
        dispatch(tatoCreated());
        dispatch(loadTatoos());
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};

export const editTatoo = (sizes, styles, data, id, imgChanged) => async(dispatch) => {
    dispatch(tatooEditRequested());
    try {
        const sendData = {
            ...data,
            size: sizes.find((s) => s._id === data.size),
            style: styles.find((el) => el._id === data.style).name,
            imgChanged
        };
        await tattoosService.edit(id, sendData);
        dispatch(tatooEdited());
        dispatch(loadTatoos());
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};

export const deleteTatoo = (tatoo) => async(dispatch) => {
    dispatch({ type: "tatoos/tatooDeleteRequested" });
    try {
        const { _id, src } = tatoo;
        const srcArr = src.split("\\").length > 1 ? src.split("\\") : src.split("/");
        const lngth = srcArr.length;
        await tattoosService.remove(_id, srcArr[lngth - 2], srcArr[lngth - 1]);
        dispatch({ type: "tatoos/tatooDeleted" });
        dispatch(loadTatoos());
    } catch (error) {
        dispatch(requestFaild(error.message));
    }
};
// selectors

export const getTatoosSelector = () => (state) => state.tatoos.entities;

export const getTatoosIsloadingSelector = () => (state) => state.tatoos.loading.entities;

export const getUploadLoadingSelector = () => (state) => state.tatoos.loading.upload;

export const getCreateLoadingSelector = () => (state) => state.tatoos.loading.create;

export const getEditLoadingSelector = () => (state) => state.tatoos.loading.edit;

export const getTatooInStorageSelector = () => (state) => {
    const storage = localStorageService.getStore();
    const isLoading = state.tatoos.loading.entities;
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
