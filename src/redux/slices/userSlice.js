import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// Alert
import Swal from "sweetalert2";
// import {getProducts} from "../actions/productActions";
import {
    ADD_PRODUCT_INTO_CART, ADD_PRODUCT_INTO_WISHLIST,
    AUTHENTICATE,
    BASE_URL, EMPTY_CART, EMPTY_WISHLIST, GET_CART_DATA, GET_WISHLIST_DATA,
    REGISTER,
    REMOVE_PRODUCT_FROM_CART, REMOVE_PRODUCT_FROM_WISHLIST
} from "../apiServices/apiConstants";
import {API} from "../apiServices/apiCall";
import userState from "../store/userState";

export const authenticate = createAsyncThunk('user/authenticate', async (data) => {
    let response = await API(BASE_URL + AUTHENTICATE, 'POST', data);

    return response;
});

export const register = createAsyncThunk('user/register', async (data) => {
    let response = await API(BASE_URL + REGISTER, 'POST', data);

    return response;
});

export const getCartData = createAsyncThunk('user/getCartData', async (data) => {
    let response = await API(BASE_URL + GET_CART_DATA + `/${data}`);
    return response;
});

export const addProductIntoCart = createAsyncThunk('user/addProductIntoCart', async (data) => {
    let response = await API(BASE_URL + ADD_PRODUCT_INTO_CART, 'POST', data);
    return response;
});

export const removeProductFromCart = createAsyncThunk('user/removeProductFromCart', async (data) => {
    debugger
    let response = await API(BASE_URL + REMOVE_PRODUCT_FROM_CART, 'POST', data);
    return response;
});

export const emptyCart = createAsyncThunk('user/emptyCart', async (data) => {
    let response = await API(BASE_URL + EMPTY_CART, 'DELETE', data);
});

export const getWishlistData = createAsyncThunk('user/getWishlistData', async (data) => {
    let response = await API(BASE_URL + GET_WISHLIST_DATA + `/${data}`);
    return response;
});

export const addProductIntoWishlist = createAsyncThunk('user/addProductIntoWishlist', async (data) => {
    let response = await API(BASE_URL + ADD_PRODUCT_INTO_WISHLIST, 'POST', data);
    return response;
});

export const removeProductFromWishlist = createAsyncThunk('user/removeProductFromWishlist', async (data) => {
    let response = await API(BASE_URL + REMOVE_PRODUCT_FROM_WISHLIST, 'POST', data);
    return response;
});

export const emptyWishlist = createAsyncThunk('user/emptyWishlist', async (data) => {
    let response = await API(BASE_URL + EMPTY_WISHLIST, 'DELETE', data);
    return response;
});

// Product Slice
const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        // Get Single Product
        getProductById: (state, action) => {
            let { id } = action.payload;
            let arr = state.products.find(item => item.id === id)
            state.selectedProduct = arr
            return arr;
        },
        resetUser: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        // Get All Products
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                state.user = action.payload?.response || null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload?.response || null;
            })

            // Cart
            .addCase(getCartData.fulfilled, (state, action) => {
                state.cart = action.payload?.response;
            })
            .addCase(addProductIntoCart.fulfilled, (state, action) => {
                state.cart = action.payload?.response || null;
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.cart = action.payload.response;
            })
            .addCase(emptyCart.fulfilled, (state, action) => {
                state.cart = null;
            })

            // Wishlist
            .addCase(getWishlistData.fulfilled, (state, action) => {
                state.cart = action.payload?.response;
            })
            .addCase(addProductIntoWishlist.fulfilled, (state, action) => {
                state.cart = action.payload?.response || null;
            })
            .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
                state.cart = action.payload.response;
            })
            .addCase(emptyWishlist.fulfilled, (state, action) => {
                state.cart = null;
            })
    }
});

const userReducer = userSlice.reducer
export const { getProductById } = userSlice.actions
export default userReducer
