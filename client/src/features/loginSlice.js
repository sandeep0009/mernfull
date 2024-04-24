import { createSlice } from "@reduxjs/toolkit";

const initialStateLogin = {
    token: null,
    isLogin: false,
    isAuthentication: false
};

const globalTokenSlice = createSlice({
    name: "token",
    initialState: initialStateLogin,
    reducers: {
        globalLogin: (state, action) => {

            state.token = action.payload.token;
            console.log(state.token)
            state.isLogin = true;
            state.isAuthentication = true;
        },
        globalLogout: (state, action) => {
            state.token = null;
            state.isLogin = false;
            state.isAuthentication = false;
        }
    }
});

export const { globalLogin, globalLogout } = globalTokenSlice.actions;
export default globalTokenSlice;
