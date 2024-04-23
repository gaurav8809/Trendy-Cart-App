import React, {useEffect, useState} from 'react'
import ProductInfo from './ProductInfo'
import RelatedProduct from './RelatedProduct'
import {Link, useHistory, withRouter, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { RatingStar } from "rating-star";
import Swal from 'sweetalert2';
import productState from "../../../redux/store/productState";
import {getProductById} from "../../../redux/slices/productSlice";
import NO_PRODUCT from "../../../assets/img/common/no-product.png";
import {
    addProductIntoCart,
    addProductIntoWishlist,
    removeProductFromCart,
    updateProductIntoCart
} from "../../../redux/slices/userSlice";
import {InCart, InWishlist} from "../../../handlers/appHandler";
import {AiOutlineHeart} from "react-icons/ai";
import _ from 'lodash';
import MyVerticallyCenteredModal from "../Modal";
import MyVerticallyCenteredCustomModal from "../Modal/CustomModal";
import VirtualTryOn from "../../../page/virtualTryOn";

const ProductDetailsOne = (props) => {

    let { id: product_ID } = props.match.params;
    // searchParams.get("__firebase_request_key")
    let dispatch = useDispatch();
    let history = useHistory();
    const [virtualTryOnModal, setVirtualTryOnModal] = useState(false);

    dispatch(getProductById(product_ID));
    const productsReducer = useSelector(state => state.products);
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.user.cart);
    const {wishlist} = useSelector((state) => state.user);

    const [product, setProduct] = useState(productsReducer?.selectedProduct);
    let [selectedSize, setSelectedSize] = useState(InCart(cart, product.product_ID) ? InCart(cart, product.product_ID).size : null);
    let [selectedQty, setSelectedQty] = useState(InCart(cart, product.product_ID) ? InCart(cart, product.product_ID).qty : 1);

    useEffect(async () => {
        setProduct(productsReducer.selectedProduct);
        setImg(productsReducer.selectedProduct.portfolioImage)
    }, [productsReducer, user]);

    const [img, setImg] = useState(product?.portfolioImage);

    // Add to Favorite
    const addToFav = async (product_ID) => {
        dispatch({ type: "products/addToFav", payload: { product_ID } })
    }

    const onClickAddToCart = async () => {
        if(user) {
            if(!selectedSize) {
                Swal.fire({
                    title: "Size not selected!",
                    text: 'Please select the size first!!',
                    icon: "warning"
                });
                return;
            }
            if(InCart(cart, product.product_ID) ) {
                if(selectedSize === InCart(cart, product.product_ID).size && selectedQty === InCart(cart, product.product_ID).qty) {
                    Swal.fire({
                        title: "No changes made!",
                        text: 'Please update any value to make changes !!',
                        icon: "warning"
                    });
                    return;
                } else {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "This will update new changes to your product in cart",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, update it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            let payload = {
                                qty: selectedQty,
                                size: selectedSize,
                                user,
                                product: product,
                                cart: _.omit(cart, ['products'])
                            }
                            let {payload: {status, message}} = await dispatch(updateProductIntoCart(payload));
                            if(status === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: message,
                                    // html: '',
                                });
                            }
                        }
                    });
                }
            } else {
                let payload = {
                    qty: selectedQty,
                    size: selectedSize,
                    user,
                    product: product
                }
                let {payload: {status, message}} = await dispatch(addProductIntoCart(payload));
                if(status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: message,
                        // html: '',
                    });
                }
            }
        } else {
            history.push("/login");
        }
    }

    const colorSwatch = (i) => {
        // let data = product.color.find(item => item.color === i)
        // setImg(data.img)
    }

    const [count, setCount] = useState(1)

    const incNum = () => {
        if (selectedQty < product.stockQty) {
            setSelectedQty(selectedQty + 1)
        } else {
            Swal.fire('Sorry!', "Maximum stock availability reached",'warning')
            // setSelectedQty(1)
        }
    }
    const decNum = () => {
        if (selectedQty > 1) {
            setSelectedQty(selectedQty - 1)
        } else {
            Swal.fire('Sorry!', "Minimum Quantity Reached",'warning')
            setSelectedQty(1)
        }
    }

    const onClickCompare = () => {
        dispatch({ type: "products/setProductToCompare", payload: product.product_ID})
        history.push('/compare');
    }

    const onClickWishlist = async () => {
        if(InWishlist(wishlist, product_ID)) {
            Swal.fire({
                icon: 'warning',
                title: 'Already in wishlist',
                html: 'Go to wishlist to add it in cart'
            });
            return;
        }
        if(user) {
            let payload = {
                user,
                product: props.data
            }
            let {payload: {status, message}} = await dispatch(addProductIntoWishlist(payload));
            if(status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: message,
                });
            }
        } else {
            history.push("/login");
        }
    }

    return (
        <>{product
            ?
            <section id="product_single_one" className="ptb-100">
                <div className="container">
                    <div className="row area_boxed">
                        <div className="col-lg-4">
                            <div className="product_single_one_img">
                                <img src={img} alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="product_details_right_one">
                                <div className="modal_product_content_one">
                                    <h3>{product.title}</h3>
                                    <div className="reviews_rating">
                                        <RatingStar maxScore={5} rating={product.price} id="rating-star-common" />
                                        <span>({3} Customer Reviews)</span>
                                    </div>
                                    <h4>${product.price} <del>${parseInt(product.price) + 17}.00</del> </h4>
                                    <p>{product.description}</p>
                                    <br/>
                                    <span>Material: {product.material}</span>
                                    <div className="customs_selects">
                                        <select name="product" className="customs_sel_box" onChange={e => setSelectedSize(e.target.value)}>
                                            <option value="" disabled selected>Size</option>
                                            {
                                                product.size?.map((item) => <option selected={item === selectedSize} key={item} value={item}>{item}</option>)
                                            }
                                        </select>
                                    </div>
                                    {/*<div className="variable-single-item">*/}
                                    {/*    <span>Color</span>*/}
                                    {/*    <div className="product-variable-color">*/}
                                    {/*        <label htmlFor="modal-product-color-red1">*/}
                                    {/*            <input name="modal-product-color" id="modal-product-color-red1"*/}
                                    {/*                className="color-select" type="radio" onChange={() => { colorSwatch('red') }} defaultChecked/>*/}
                                    {/*            <span className="product-color-red"></span>*/}
                                    {/*        </label>*/}
                                    {/*        <label htmlFor="modal-product-color-green3">*/}
                                    {/*            <input name="modal-product-color" id="modal-product-color-green3"*/}
                                    {/*                className="color-select" type="radio" onChange={() => { colorSwatch('green') }} />*/}
                                    {/*            <span className="product-color-green"></span>*/}
                                    {/*        </label>*/}
                                    {/*        <label htmlFor="modal-product-color-blue5">*/}
                                    {/*            <input name="modal-product-color" id="modal-product-color-blue5"*/}
                                    {/*                className="color-select" type="radio" onChange={() => { colorSwatch('blue') }} />*/}
                                    {/*            <span className="product-color-blue"></span>*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <form id="product_count_form_two">
                                        <div className="product_count_one">
                                            <div className="plus-minus-input">
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={decNum}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input className="form-control"  style={{width: 60}} type="number" value={selectedQty} readOnly />
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={incNum}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="links_Product_areas">
                                        <ul>
                                            <li>
                                                <a className="action wishlist" title="Wishlist" onClick={onClickWishlist}><i
                                                    className="fa fa-heart"></i>{InWishlist(wishlist, product_ID) ? 'In wishlist' : 'Add To Wishlist'}</a>
                                            </li>
                                            <li>
                                                <a className="action compare" onClick={onClickCompare} title="Compare"><i
                                                    className="fa fa-exchange"></i>Add To Compare</a>
                                            </li>
                                            <li>
                                                <a className="action compare" onClick={() => setVirtualTryOnModal(true)} title="Compare"><i
                                                    className="fa fa-camera"></i>Virtual try on</a>
                                            </li>
                                        </ul>
                                        {
                                            <a className="theme-btn-one btn-black-overlay btn_sm" onClick={onClickAddToCart}>{
                                                InCart(cart, product.product_ID) ? 'Update Cart' : 'Add To Cart'
                                            }</a>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductInfo product={product} />
                </div>
            </section>
            :
            <div className="container ptb-100">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                        <div className="empaty_cart_area">
                            <img src={NO_PRODUCT} alt="img" style={{height: 200, width: 300}} />
                            <h2>PRODUCT NOT FOUND</h2>
                            <h3>Sorry Mate... No Item Found according to Your query!</h3>
                            <Link to="/shop" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        }

            <RelatedProduct />
            <MyVerticallyCenteredCustomModal data={props.data} show={virtualTryOnModal} onHide={() => setVirtualTryOnModal(false)}>
                <VirtualTryOn data={img} />
            </MyVerticallyCenteredCustomModal>
        </>
    )
}

export default withRouter(ProductDetailsOne)
