import { configureStore } from "@reduxjs/toolkit";
import books from "./BookSlice";
import auth from "./AuthSlice";
import report from "./ReportSlice";



const store = configureStore({
    reducer: {
        books,
        auth,
        report,
    }
});

export default store;