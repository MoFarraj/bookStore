import { createSlice} from "@reduxjs/toolkit";

const initState = {isLogin:false , name:'Mo Farrag'};

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        logInOut: (state) => { 
            state.isLogin = !state.isLogin;
        }
    }

})

export default authSlice.reducer;
export const {logInOut} = authSlice.actions; 