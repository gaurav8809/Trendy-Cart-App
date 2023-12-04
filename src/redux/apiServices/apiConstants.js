module.exports = {
    // BASE_URL: 'https://trendy-cart-app.azurewebsites.net',
    BASE_URL: 'http://localhost:7071',

    // PRODUCTS
    GET_PRODUCTS: '/api/product/getProducts',
    GET_PRODUCTS_CATEGORY_LIST: '/api/product/getProductsCategoryList',
    GET_PRODUCTS_BY_CATEGORY: '/api/product/getProductsByCategory',

    // USER
    AUTHENTICATE: '/api/user/authenticate',
    REGISTER: '/api/user/register',
    GET_CART_DATA: '/api/user/getCartData',
    ADD_PRODUCT_INTO_CART: '/api/user/addProductIntoCart',
    REMOVE_PRODUCT_FROM_CART: '/api/user/removeProductFromCart',
    EMPTY_CART: '/api/user/emptyCart',
};
