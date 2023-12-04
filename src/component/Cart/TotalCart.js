import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const TotalCart = (props) => {
    let {cart} = useSelector((state) => state.user);
    let productsData = useSelector((state) => state.products.products);

    console.log('CARTR:', cart)

    let cartProducts = [];

    cart.products.filter(item=> {
        productsData.filter(item2 => {
            if(item.product_ID === item2.product_ID) {
                cartProducts.push({...item, ...item2});
            }
        })
    });

    const cartTotal = () => {
        return cartProducts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * item.price)
        }, 0)
    }
    return (
        <>
                <div className="col-lg-6 col-md-6">
                    <div className="coupon_code right">
                        <h3>Cart Total</h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Subtotal</p>
                                <p className="cart_amount">${cart.subtotal}</p>
                            </div>
                            <div className="cart_subtotal ">
                                <p>Sales tax</p>
                                <p className="cart_amount"> ${parseFloat(cart.salesTax).toFixed(2)}</p>
                            </div>
                            <div className="cart_subtotal">
                                <p>Total</p>
                                <p className="cart_amount">${parseFloat(cart.total).toFixed(2)}</p>
                            </div>
                            <div className="checkout_btn">

                                <Link to="/checkout-one" className="theme-btn-one btn-black-overlay btn_sm">
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default TotalCart
