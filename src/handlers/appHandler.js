export const InCart = (cart, product_ID) => {
    return cart?.products.find(item => item.product_ID === product_ID)
};
