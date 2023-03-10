import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const base_Url = 'https://dummyjson.com'

export const fetchProducts = createAsyncThunk('products/getAllProduct', async() => {
    try {
        const response = await fetch(`${base_Url}/products?limit=32`)
        const data = await response.json()
        // console.log(data.products)
        return data.products
   } catch (error) {
    console.log(error)
   }
})


const initialState = {
    products : [],
} as any

const productSlice = createSlice ({
    name : "products",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }

})

export default productSlice.reducer;