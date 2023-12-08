import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import {Link, useHistory, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import MyVerticallyCenteredModal from '../../Common/Modal';
import {setProductToCompare} from "../../../redux/slices/productSlice";
import {addProductIntoCart, register} from "../../../redux/slices/userSlice";
import Swal from "sweetalert2";
import {InCart} from "../../../handlers/appHandler";

const ProductCard = (props) => {

    const {
        product_ID,
        price,
        name,
        portfolioImage,
        description,
    } = props.data;
    const history = useHistory();
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.user.cart);

    let dispatch = useDispatch();
    // Add to cart
    const addToCart = async (id) => {
        dispatch({ type: "products/addToCart", payload: { id } })
    }
    // Add to Favorite
    const addToFav = async (id) => {
        dispatch({ type: "products/addToFav", payload: { id } })
    }
    // Add to Compare
    const addToComp = async (id) => {
        dispatch({ type: "products/addToComp", payload: { id } })
    }
    const [modalShow, setModalShow] = useState(false);

    const onClickWishlist = () => {
        !user && history.push('/login')
    }

    const onClickCompare = async () => {
        if(user) {
            let payload = {
                user,
                product: props.data
            }
            let {payload: {status, message}} = await dispatch(addProductIntoCart(payload));
            if(status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: message,
                    // html: '',
                });
            }
        } else {
            history.push("/login");
        }
    }

    const onClickAddToCart = async () => {
        if(user) {
            let payload = {
                qty: 1,
                size: 'S',
                user,
                product: props.data
            }
            let {payload: {status, message}} = await dispatch(addProductIntoCart(payload));
            if(status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: message,
                    // html: '',
                });
            }
        } else {
            history.push("/login");
        }
    }

    return (
        <>
            <div className="product_wrappers_one">
                <div className="thumb">
                    <Link
                        to={{pathname: `/product-details-one/${product_ID}`}}
                        // onClick={onClickProduct}
                        className="image">
                        <img src={portfolioImage} alt="Product" />
                        <img className="hover-image" src={portfolioImage}
                            alt="Product" />
                    </Link>
                    {
                        InCart(cart, product_ID) &&
                        <span className="badges">
                            <span className={(['hot','new','sale'][Math.round(Math.random()*2)])}>{'In cart'}</span>
                        </span>
                    }

                    <div className="actions">
                        <a className="action wishlist" title="Wishlist" onClick={onClickWishlist}><AiOutlineHeart /></a>
                        <a className="action quickview" title="Quick view" onClick={() => setModalShow(true)}><AiOutlineExpand /></a>
                        <a className="action compare" title="Compare" onClick={onClickCompare}><FaExchangeAlt /></a>
                    </div>
                    {
                        !InCart(cart, product_ID) &&
                        <button type="button" className="add-to-cart offcanvas-toggle" onClick={onClickAddToCart}> { InCart(cart, product_ID) ? 'In cart' : 'Add to cart' }</button>

                    }
                </div>
                <div className="content">
                    <h5 className="title">
                        <Link to={`/product-details-one/${product_ID}`}>{name}</Link>
                    </h5>
                    <span className="price">
                        <span className="new">${price}</span>
                    </span>
                </div>
            </div>

            <MyVerticallyCenteredModal data={props.data} show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default withRouter(ProductCard)
