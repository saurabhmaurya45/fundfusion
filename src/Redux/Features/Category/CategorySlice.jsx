import {createSlice} from '@reduxjs/toolkit'
import { getCategory } from './CategoryService';

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        categories:[],
        total: 0,
        isLoading: false,
        error:null
    },
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
            .addCase(getCategory.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getCategory.fulfilled, (state,action)=>{
                state.categories = action.payload;
                state.total = action.payload?.length;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getCategory.rejected, (state)=>{
                state.isLoading = false;
                state.error  = "Failed to fetch category, try again"
            })
    }
})


export default categorySlice.reducer;