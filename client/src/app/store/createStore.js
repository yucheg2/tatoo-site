import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments";
import countsReducer from "./count";
import mastersReducer from "./masters";
import placesReducer from "./places";
import sizesReducer from "./sizes";
import stylesReducer from "./styles";
import tatoosReducer from "./tatoo";
import usersReducer from "./users";

const rootReducer = combineReducers({
    counts: countsReducer,
    tatoos: tatoosReducer,
    styles: stylesReducer,
    sizes: sizesReducer,
    places: placesReducer,
    masters: mastersReducer,
    users: usersReducer,
    comments: commentsReducer
});

export default function createStore() {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== "production"
    });
}
