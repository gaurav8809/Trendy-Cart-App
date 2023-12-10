import React from 'react'
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import _ from 'lodash';

const YourOrders = () => {
    const history = useHistory();
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.user.cart);
    const productsAvailable = useSelector((state) => state.products.products);
    let tempCart = _.omit(cart, ['products']);
    tempCart['products'] = [];

    if(cart.products.length)
    {
        cart.products.filter(item => {
            productsAvailable.map(item2 => {
                if(item.product_ID === item2.product_ID) {
                    tempCart.products.push({
                        ...item2,
                        ...item,
                    });
                }
            })
        });
    }

    return (
        <>
            <div className="order_review  box-shadow bg-white">
                <div className="check-heading">
                    <h3>Your Orders</h3>
                </div>
                <div className="table-responsive order_table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tempCart.products?.map(item => {
                                    return(
                                        <tr>
                                            <td>{item.name} <span className="product-qty">x {item.qty}</span>
                                            </td>
                                            <td>${item.total}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>SubTotal</th>
                                <td className="product-subtotal">${cart.subtotal}</td>
                            </tr>
                            <tr>
                                <th>Sales Tax</th>
                                <td>${parseFloat(cart.salesTax).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td className="product-subtotal">${parseFloat(cart.total).toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default YourOrders
