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

const ProductDetailsOne = (props) => {

    let { id: product_ID } = props.match.params;
    // searchParams.get("__firebase_request_key")
    let dispatch = useDispatch();
    let history = useHistory();

    dispatch(getProductById(product_ID));
    const productsReducer = useSelector(state => state.products);

    const [product, setProduct] = useState(productsReducer?.selectedProduct);

    useEffect(async () => {
        setProduct(productsReducer.selectedProduct);
    }, [productsReducer]);

    // const history = useHistory();
    // props.location.state === undefined && history.replace('/shop');

    // const { selectedProduct: product } = props.location.state;
    // const product = {};
    // let { state } = useParams();

    const [img, setImg] = useState(product?.portfolioImage);
    // setProduct(useSelector((state) => state.products.selectedProduct));

    // let {
    //     portfolioImage
    // } = product;

    // Add to cart
    const addToCart = async (product_ID) => {
        dispatch({ type: "products/addToCart", payload: { product_ID } })
    }

    // Add to Favorite
    const addToFav = async (product_ID) => {
        dispatch({ type: "products/addToFav", payload: { product_ID } })
    }

    // Add to Compare
    const addToComp = async (product_ID) => {
        dispatch({ type: "products/setProductToCompare", payload: product_ID})
        history.push('/compare');
    }

    const colorSwatch = (i) => {
        // let data = product.color.find(item => item.color === i)
        // setImg(data.img)
    }

    const [count, setCount] = useState(1)


    const incNum = () => {
        setCount(count + 1)
    }
    const decNum = () => {
        if (count > 1) {
            setCount(count - 1)
        } else {
            Swal.fire('Sorry!', "Minimun Quantity Reached",'warning')
            setCount(1)
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
                                    <h4>${product.price}.00 <del>${parseInt(product.price) + 17}.00</del> </h4>
                                    <p>{product.description}</p>
                                    <div className="customs_selects">
                                        <select name="product" className="customs_sel_box">
                                            <option value="" disabled selected>Size</option>
                                            {
                                                product.size?.map((item) => <option key={item} value={item}>{item}</option>)
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
                                                <input className="form-control"  style={{width: 60}} type="number" value={count} readOnly />
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
                                                <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product_ID)}><i
                                                    className="fa fa-heart"></i>Add To Wishlist</a>
                                            </li>
                                            <li>
                                                <a href="#!" className="action compare" onClick={() => addToComp(product_ID)} title="Compare"><i
                                                    className="fa fa-exchange"></i>Add To Compare</a>
                                            </li>
                                        </ul>
                                        <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(product_ID)}>Add To Cart</a>
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
        </>
    )
}

export default withRouter(ProductDetailsOne)
