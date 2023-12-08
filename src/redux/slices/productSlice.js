import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
// Alert
import Swal from "sweetalert2";
import productState from "../store/productState";
// import {getProducts} from "../actions/productActions";
import {BASE_URL, GET_PRODUCTS} from "../apiServices/apiConstants";
import {API} from "../apiServices/apiCall";

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    return await API(BASE_URL + GET_PRODUCTS);
});

export const getProductsByCategory = createAsyncThunk('products/getProductsByCategory', async () => {
    return await API(BASE_URL + GET_PRODUCTS);
});

// Product Slice
const productsSlice = createSlice({
    name: 'products',
    initialState: productState,
    reducers: {
        // Get Single Product
        getProductById (state, action){
            let id = action.payload;
            let arr = current(state).products.find(item => item.product_ID === parseInt(id))
            state.selectedProduct = arr
        },
        setProductToCompare: (state, action) => {
            let stateValue = current(state);
            if(stateValue.compareProducts.length)
            {
                if(!stateValue.compareProducts.includes(action.payload))
                    state.compareProducts = [...state.compareProducts, action.payload];
            } else {
                state.compareProducts = [action.payload];
            }
        },
        removeFromCompare: (state, action) => {
            state.compareProducts = state.compareProducts.filter(item => item !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Get All Products
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
    }
});

const productsReducer = productsSlice.reducer
export const { getProductById } = productsSlice.actions
export default productsReducer
