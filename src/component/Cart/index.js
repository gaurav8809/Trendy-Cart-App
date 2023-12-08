import React from "react";
import Coupon from './Coupon'
import TotalCart from './TotalCart'
import { Link } from 'react-router-dom'
import img from '../../assets/img/common/empty-cart.png'
import { useDispatch, useSelector } from "react-redux";
import {removeProductFromCart} from "../../redux/slices/userSlice";
import Swal from "sweetalert2";
import NO_PRODUCT from "../../assets/img/common/no-product.png";

const CartArea = () => {
    let dispatch = useDispatch();
    let {cart} = useSelector((state) => state.user);
    let productsData = useSelector((state) => state.products.products);

    let cartProducts = [];

    cart?.products.filter(item=> {
        productsData.filter(item2 => {
            if(item.product_ID === item2.product_ID) {
                cartProducts.push({...item, ...item2});
            }
        })
    });
    // Remove from Cart
    const rmProduct = async (id = null) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will remove product from your cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                let payload = {
                    ...cart,
                    cart_item: cart.products.find(item => item.product_ID === id)
                };
                let {payload: {status, message}} = await dispatch(removeProductFromCart(payload));
                if(status === 200) {
                    Swal.fire({
                        title: "Deleted!",
                        text: message,
                        icon: "success"
                    });
                }
            }
        });
    }
    // Clear
    const clearCarts = () => {
        dispatch({ type: "products/clearCart" });
    }
    // Value Update
    const cartValUpdate = (val, id) => {
        dispatch({ type: "products/updateCart", payload: { val, id } });
    }

    return (
        <>
            {cartProducts.length
                ?
                <section id="cart_area_one" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="table_desc">
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product_thumb">Image</th>
                                                    <th className="product_name">Product</th>
                                                    <th className="product-price">Price</th>
                                                    <th className="product_quantity">Quantity</th>
                                                    <th className="product_total">Total</th>
                                                    <th className="product_remove">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartProducts.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="product_thumb">
                                                            <Link to={`/product-details-one/${data.product_ID}`}>
                                                                <img src={data.portfolioImage} alt="img" />
                                                            </Link>
                                                        </td>
                                                        <td className="product_name">
                                                            <Link to={`/product-details-one/${data.product_ID}`}>
                                                                {data.name}
                                                            </Link>
                                                        </td>
                                                        <td className="product-price">${data.price}</td>
                                                        <td className="product_quantity">
                                                            <input min="1" max="100" type="number" onChange={e => cartValUpdate(e.currentTarget.value, data.id)} defaultValue={data.qty || 1} />
                                                        </td>
                                                        <td className="product_total">${data.total}</td>
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => rmProduct(data.product_ID)} style={{ 'cursor': 'pointer' }}></i>
                                                        </td>
                                                    </tr>
                                                ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {/*<div className="cart_submit">*/}
                                    {/*    {cartProducts.length*/}
                                    {/*        ? <button className="theme-btn-one btn-black-overlay btn_sm" type="button" onClick={rmProduct}>Clear cart</button>*/}
                                    {/*        : null*/}
                                    {/*    }*/}

                                    {/*</div>*/}
                                </div>
                            </div>
                            <Coupon />
                            <TotalCart />
                        </div>
                    </div>
                </section>
                : <section id="empty_cart_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <img src={NO_PRODUCT} alt="img" style={{height: 200, width: 300}} />
                                    <h2>YOUR CART IS EMPTY</h2>
                                    <h3>Sorry Mate... No Item Found Inside Your Cart!</h3>
                                    <Link to="/shop" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default CartArea
