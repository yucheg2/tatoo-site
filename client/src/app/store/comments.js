import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/comments.service";
import createErrorMessage from "../utils/createErrorMessage";
import getNameById from "../utils/getUserName";

export const addComment = createAsyncThunk(
    "comments/addComment",
    async function({ masterId, send }, { rejectWithValue }) {
        try {
            const { data } = await commentsService.add(masterId, send);
            return data;
        } catch (error) {
            return rejectWithValue(createErrorMessage(error));
        }
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entieties: [],
        loading: {
            comments: true,
            addComment: false
        },
        error: {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(addComment.pending, (state) => {
                state.loading.addComment = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.entieties = [...state.entieties, action.payload];
                state.loading.addComment = false;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.error = { ...action.payload };
                state.loading.addComment = false;
            });
    },
    reducers: {
        requested(state) {
            state.loading.comments = true;
        },
        resived(state, action) {
            state.entieties = action.payload;
            state.loading.comments = false;
        },
        requestFaild(state, action) {
            state.error = action.payload;
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;

const { requested, resived, requestFaild } = actions;

export const loadComments = (masterId) => async(dispatch) => {
    dispatch(requested());
    try {
        const { data } = await commentsService.get(masterId);
        if (data) {
            const comments = Object.values(data);
            const commentsWithName = await Promise.all(comments.map(async(com) => ({
                ...com,
                name: await getNameById(com.name)
            })));
            dispatch(resived(commentsWithName));
        } else {
            dispatch(resived([]));
        }
    } catch (error) {
        dispatch(requestFaild(createErrorMessage(error)));
    }
};

// selectors

export const getCommentsLoadingStatus = () => (state) => state.comments.loading.comments;

export const getCommentsList = () => (state) => state.comments.entieties;

export default commentsReducer;

// ДОБАВИТЬ ЛОАДЕРЫ
