import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import productService from "./productService";

const initialState = {
    products:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
};
// get all products 
export const getProducts = createAsyncThunk("products/all",async(thunkAPI)=>{
    try {
        return await productService.getAllProducts();
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// create a new product 
export const createNewProduct = createAsyncThunk("product/add",async(product,thunkAPI)=>{
    try {
        return await productService.createProduct(product)
    } catch (error) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message)
    }
});

// delete a product
export const deleteProduct = createAsyncThunk("product/delete",async(id,thunkAPI)=>{
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message)
    }
});

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        reset: (state)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ""
        }
    },
    extraReducers:(builder)=>{
        builder
         .addCase(getProducts.pending,(state)=>{
            state.isLoading = true;
         })
         .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload
         })
         .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            // state.isSuccess = false;
            message: action.payload
         })
         .addCase(createNewProduct.pending,(state)=>{
            state.isLoading = true;
         })
         .addCase(createNewProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.products.push(action.payload)
         })
         .addCase(createNewProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            // state.isSuccess = false;
            message: action.payload
         })
         .addCase(deleteProduct.pending,(state)=>{
            state.isLoading = true;
         })
         .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.products = state.products.filter((product)=> product._id !== action.payload.id)
         })
         .addCase(deleteProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            // state.isSuccess = false;
            message: action.payload
         })
    }
});


export const {reset} = productSlice.actions;
export default productSlice.reducer