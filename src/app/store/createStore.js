import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countsReducer from "./count";
import placesReducer from "./places";
import sizesReducer from "./sizes";
import stylesReducer from "./styles";
import tatoosReducer from "./tatoo";

const rootReducer = combineReducers({
    counts: countsReducer,
    tatoos: tatoosReducer,
    styles: stylesReducer,
    sizes: sizesReducer,
    places: placesReducer
});

export default function createStore() {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== "production"
    });
}
