import { createSlice} from "@reduxjs/toolkit";

const reportSlise = createSlice({
    name: 'report',
    initialState: {logs: []},
    reducers: {
        logInsert: (state , action) => {
            state.logs.push(action.payload);
        }
    }

});

export default reportSlise.reducer;
export const {logInsert} = reportSlise.actions;