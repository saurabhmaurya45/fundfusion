import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk("category/get", async(contract) => {
    try {
        const categories = await contract?.call("getCategories")
        const parsedCategories = categories?.map((item) => {
            return { categoryId: item.categoryId._hex, name: item[1] };
        })
        return parsedCategories;
    }
    catch (e) {
        return e;
    }
})