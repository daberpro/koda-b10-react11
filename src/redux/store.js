import { configureStore } from "@reduxjs/toolkit";
import rickMortySlice from "./slice/rickmorty.slice.js";

const store = configureStore({
    reducer: {
        data: rickMortySlice
    }
});
export default store;
