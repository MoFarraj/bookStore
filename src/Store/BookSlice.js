import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { logInsert } from "./ReportSlice";

export const getBooks = createAsyncThunk('book/getBooks' , async (args , thunkAPI) => { // (args.meta = id)
    const {rejectWithValue} = thunkAPI;
    try {
        //part2:
        //dispath(type:'book/getBooks.pending' , payload: undefiend)
        const result = await fetch('http://localhost:3005/books');
        const data = await result.json();
        return data;
        //dispath(type:'book/getBooks.fulfilled' , payload: data)

    } catch (error) {
        return rejectWithValue(error.message);
        //dispath(type:'book/getBooks.rejected' , payload: error)
    }
});

export const insertBook = createAsyncThunk('book/insertBook' , async (bookData , thunkAPI) => {
    const {rejectWithValue , getState , dispatch} = thunkAPI;

    try {
        bookData.userName = getState().auth.name;
        //dispatch(deleteBook({id:5})) // make action(delete) from anthor action(insert) 
        const result = await fetch('http://localhost:3005/books', {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {'Content-type': 'application/json; charset=utf-8',} 
        });
        
        const data = await result.json();
        dispatch(logInsert({name: 'InsertBook' , status: 'success'}))
        return data;

    } catch (error) {
        dispatch(logInsert({name: 'InsertBook' , status: 'failed'}))
        return rejectWithValue(error.message);
    }
});

export const deleteBook = createAsyncThunk('book/deleteBook' , async (item , thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
        await fetch(`http://localhost:3005/books/${item.id}`, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json; charset=utf-8'} 
        });
        
        return item;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getDetails = createAsyncThunk('book/getDetails' , async (item , thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        await fetch(`http://localhost:3005/books/${item.id}`, {
            method: 'GET',
            headers: {'Content-type': 'application/json; charset=utf-8',} 
        });
        
        return item;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// part 1 :

//getBooks => createAsyncthunk => cerate 3 type of actions:-
//1- pending => createAction('book/getBooks.pending , (payload) => return payload)
//2- fulfilled => createAction('book/getBooks.fulfilled , (payload) => return payload)
//3- rejected => createAction('book/getBooks.rejected , (payload) => return payload)

const initState = {books: [] , isLodaing: false , isError: null , bookInfo: null};

const bookSlice = createSlice({
    name: "book",
    initialState: initState,
    //part3:
    extraReducers: {
        //getBooks
        [getBooks.pending]: (state , action) => {
            state.isLodaing = true;
            state.isError = null;
        },

        [getBooks.fulfilled]: (state , action) => {
            state.isLodaing = false;
            state.books = action.payload;
        },

        [getBooks.rejected]: (state , action) => {
            state.isLodaing = false;
            state.isError = action.payload;
        },

        //insertBook
        [insertBook.pending]: (state , action) => {
            state.isLodaing = true;
            state.isError = null;
        },

        [insertBook.fulfilled]: (state , action) => {
            state.isLodaing = false;
            state.books.push(action.payload);
        },

        [insertBook.rejected]: (state , action) => {
            state.isLodaing = false;
            state.isError = action.payload;
        },

        //deleteBook
        [deleteBook.pending]: (state , action) => {
            state.isLodaing = true;
            state.isError = null;
        },

        [deleteBook.fulfilled]: (state , action) => {
            state.isLodaing = false;
            state.books = state.books.filter((item) => item.id !== action.payload.id) 
        },

        [deleteBook.rejected]: (state , action) => {
            state.isLodaing = false;
            state.isError = action.payload;
        },

        //getDetails
        [getDetails.pending]: (state , action) => {
            state.isLodaing = true;
            state.isError = null;
        },

        [getDetails.fulfilled]: (state , action) => {
            state.isLodaing = false;
            state.bookInfo = action.payload;

        },

        [getDetails.rejected]: (state , action) => {
            state.isLodaing = false;
            state.isError = action.payload;
        }
    }
});


export default bookSlice.reducer;