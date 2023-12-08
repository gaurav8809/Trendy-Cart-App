import React from "react";
import {Link} from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import img from '../../assets/img/common/empty-cart.png'
import {addProductIntoCart, removeProductFromWishlist} from "../../redux/slices/userSlice";
import Swal from "sweetalert2";
import {InCart} from "../../handlers/appHandler";
import NO_PRODUCT from "../../assets/img/common/no-product.png";

const Wishlist = () => {
    const dispatch = useDispatch();

    let {cart, wishlist: favorites} = useSelector((state) => state.user);
    let productsData = useSelector((state) => state.products.products);
    const user = useSelector((state) => state.user.user);

    const onClickAddToCart = async (product_ID, product) => {
        if(InCart(cart, product_ID)) {
            Swal.fire({
                icon: 'warning',
                title: 'Already in cart',
                html: 'Go to cart to checkout this product'
            });
            return;
        }
        if(user) {
            let payload = {
                qty: 1,
                size: 'S',
                user,
                product
            }
            let {payload: {status, message}} = await dispatch(addProductIntoCart(payload));
            if(status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: message,
                    // html: '',
                })
                    .then(() => {
                        rmFavProduct(product_ID, 'cart');
                    })
            }
        }
    }

    const rmFavProduct = (id, from = 'default') => {
        const doRemoveAction = async () => {
            let payload = {
                ...favorites,
                wishlist_item: favorites.products.find(item => item.product_ID === id)
            };
            let {payload: {status, message, response}} = await dispatch(removeProductFromWishlist(payload));
            if(status === 200) {
                if(response === null) {
                    document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
                }
                from === 'default' &&
                Swal.fire({
                    title: 'Deleted!',
                    text: message,
                    icon: "success"
                });
            }
        }

        if(from === 'cart') {
            doRemoveAction();
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "This will remove product from your wishlist",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    doRemoveAction();
                }
            });
        }
    }

    return (
        <>
          {favorites?.products.length ?
            <section id="Wishlist_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="table_desc">
                                <div className="table_page table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="product_thumb">Image</th>
                                                <th className="product_name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product_stock">Stock Status</th>
                                                <th className="product_addcart">Add To Cart</th>
                                                <th className="product_remove">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {favorites?.products?.map((data, index) => {
                                              let favProduct = productsData.find(i => i.product_ID === data.product_ID);
                                              return (
                                              <tr key={index}>
                                                  <td className="product_thumb">
                                                      <Link to={`/product-details-one/${data.product_ID}`}>
                                                          <img src={favProduct.portfolioImage} alt="img"/>
                                                      </Link>
                                                  </td>
                                                  <td className="product_name">
                                                      <Link to={`/product-details-one/${data.product_ID}`}>
                                                          {favProduct.name}
                                                      </Link>
                                                  </td>
                                                  <td className="product-price">${favProduct.price}</td>
                                                  <td className="product_stock"><h6>{favProduct.stockQty ? 'Available' : 'Out of stock'}</h6></td>
                                                  <td className="product_addcart">
                                                      {
                                                          !InCart(cart, data.product_ID) ?
                                                          (favProduct.stockQty > 0 ?
                                                              <button type="button"
                                                                      className="theme-btn-one btn-black-overlay btn_sm"
                                                                      onClick={() => onClickAddToCart(data.product_ID, favProduct)}>Add to cart
                                                              </button>
                                                              : 'Out of stock') :
                                                              <span>In cart</span>
                                                      }
                                                  </td>
                                                  <td className="product_remove">
                                                      <i className="fa fa-trash text-danger"
                                                         onClick={() => rmFavProduct(data.product_ID)}
                                                         style={{'cursor': 'pointer'}}></i>
                                                  </td>
                                              </tr>
                                              );
                                            })
                                          }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            :         <section id="empty_cart_area" className="ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                        <div className="empaty_cart_area">
                            <img src={NO_PRODUCT} alt="img" style={{height: 200, width: 300}} />
                            <h2>YOUR WISHLIST IS EMPTY</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
              }
        </>
    )
}

export default Wishlist
