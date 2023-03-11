import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const base_Url = 'https://dummyjson.com'

// Get Products
export const fetchProducts = createAsyncThunk('products/getAllProduct', async() => {
    try {
        const response = await fetch(`${base_Url}/products?limit=32`)
        const data = await response.json()
        return data.products
   } catch (error) {
    console.log(error)
   }
})

// Get Categories
export const fetchCategories = createAsyncThunk('products/getAllCategory', async() => {
    try {
        const response = await fetch(`${base_Url}/products/categories`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
})


// Get Product by Category
export const getProductsByCategory = createAsyncThunk('categories/getProductCategory', async(categoryId : string) => {
    try {
        const response = await fetch(`${base_Url}/category/${categoryId}`)
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
})


const initialState = {
    products : [],
    categories : [],
    byCategory : {} as [key : string]
} as any

const productSlice = createSlice ({
    name : "products",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
        builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
            state.byCategory[action.meta.arg] = action.payload
        })
    }

})

export default productSlice.reducer;