export const InCart = (cart, product_ID) => {
    return cart?.products.find(item => item.product_ID === parseInt(product_ID))
};

export const InWishlist = (wishlist, product_ID) => {
    return wishlist?.products.find(item => item.product_ID === parseInt(product_ID))
};
