import { configureStore } from "@reduxjs/toolkit";
import globalTokenSlice from "../features/loginSlice.js";


const store = configureStore({
    reducer: {
        token: globalTokenSlice.reducer
    }
});

export default store;
