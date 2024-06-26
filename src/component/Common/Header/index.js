import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
import logoWhite from '../../../assets/img/logo-white.png'
import TopHeader from './TopHeader'
import { useHistory } from "react-router-dom"
import svg from '../../../assets/img/svg/cancel.svg'
import svgsearch from '../../../assets/img/svg/search.svg'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import {removeProductFromCart, removeProductFromWishlist} from "../../../redux/slices/userSlice";
import colors from "../../../theme/colors";
import ObjectDetection from "../../../page/objectDetection";
import _ from 'lodash';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Header = () => {
    const [click, setClick] = useState(false);
    const [show, setShow] = useState();
    const [objectDetectionView, setObjectDetectionView] = useState(false);
    const [categories, setCategories] = useState([
        {
            name: 'Men',
            desc: '',
            subCategory: [
                {
                    name: 'T-Shirts',
                    desc: '',
                },
                {
                    name: 'Jeans',
                    desc: '',
                },
                {
                    name: 'Shirt',
                    desc: '',
                }
            ],
        },
        {
            name: 'Women',
            desc: '',
            subCategory: [
                {
                    name: 'T-Shirts',
                    desc: '',
                },
                {
                    name: 'Jeans',
                    desc: '',
                },
                {
                    name: 'Shorts',
                    desc: '',
                }
            ],
        },
        {
            name: 'Boys',
            desc: '',
            subCategory: [
                {
                    name: 'T-Shirts',
                    desc: '',
                },
                {
                    name: 'Jeans',
                    desc: '',
                },
                {
                    name: 'Hoodie',
                    desc: '',
                }
            ],
        },
        {
            name: 'Girls',
            desc: '',
            subCategory: [
                {
                    name: 'T-Shirts',
                    desc: '',
                },
                {
                    name: 'Jeans',
                    desc: '',
                },
                {
                    name: 'Shorts',
                    desc: '',
                }
            ],
        },
    ]);
    const [items, setItems] = useState([]);
    const [searchQuery, setsearchQuery] = useState('');
    const history = useHistory()
    const {cart, wishlist: favorites} = useSelector((state) => state.user);
    const productsData = useSelector((state) => state.products.products);
    const [recognizer, setRecognizer] = useState();
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setsearchQuery(transcript)
    }, [transcript]);

    let cartProducts = [];
    let favProducts = [];

    cart?.products.filter(item=> {
        productsData.filter(item2 => {
            if(item.product_ID === item2.product_ID) {
                cartProducts.push({...item, ...item2});
            }
        })
    });

    favorites?.products.filter(item=> {
        productsData.filter(item2 => {
            if(item.product_ID === item2.product_ID) {
                favProducts.push(item2);
            }
        })
    });

    // let favorites = useSelector((state) => state.products.favorites);
    let dispatch = useDispatch();

    const rmCartProduct = (id) => {
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
                let {payload: {status, message, response}} = await dispatch(removeProductFromCart(payload));
                if(status === 200) {
                    if(response === null) {
                        document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
                    }
                    Swal.fire({
                        title: 'Deleted!',
                        text: message,
                        icon: "success"
                    });
                }
            }
        });
    }

    const rmFavProduct = (id) => {
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

                let payload = {
                    ...favorites,
                    wishlist_item: favorites.products.find(item => item.product_ID === id)
                };
                let {payload: {status, message, response}} = await dispatch(removeProductFromWishlist(payload));
                if(status === 200) {
                    if(response === null) {
                        document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
                    }
                    Swal.fire({
                        title: 'Deleted!',
                        text: message,
                        icon: "success"
                    });
                }
            }
        });
    }

    const handleClick = () => {
        if (click) {
            document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handleWish = () => {
        if (click) {
            document.querySelector("#offcanvas-wishlish").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-wishlish").style = ("transform: translateX(0);")
        }
        setClick(!click);
    }

    const handleSearch = () => {
        if (click) {
            document.querySelector("#search").style = ("transform: translate(-100%, 0); opacity: 0")
        } else {
            document.querySelector("#search").style = ("transform: translate(0px, 0px); opacity: 1")
        }
        setClick(!click);
    }
    const handleabout = () => {
        if (click) {
            document.querySelector("#offcanvas-about").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-about").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handlemenu = () => {
        if (click) {
            document.querySelector("#mobile-menu-offcanvas").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#mobile-menu-offcanvas").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }

    const handleShow = (value) => {
        value === show ? setShow("") : setShow(value)
    }

    // Sticky Menu Area
    useEffect(() => {
        // window.addEventListener('scroll', isSticky);
        // return () => {
        //     window.removeEventListener('scroll', isSticky);
        // };
    });

    const isSticky = (e) => {
        // const header = document.querySelector('.header-section');
        // if(header?.classList) {
        //     const scrollTop = window.scrollY;
        //     scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
        // }
    };

    const onPressCategory = (item) => {
        console.log(item);
    };

    const addItemInList = (item) => {
        if(!_.includes(items, {class: item.class}))
        {
            let temp_items = _.cloneDeep(items);
            temp_items.push(item);
            setItems(temp_items);
        }
    }

    return (
        <>
            <TopHeader />
            <header className="header-section d-none d-xl-block">
                <div className="header-wrapper">
                    <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between">
                                    <div className="header-logo">
                                        <div className="logo">
                                            <Link to="/"><img src={logo} alt="logo" /></Link>
                                        </div>
                                    </div>
                                    <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                        <nav>
                                            <ul>
                                                {/*{MenuData.map((item, index) => (*/}
                                                {/*    <NaveItems item={item} key={index} />*/}
                                                {/*))}*/}
                                                <li className="has-dropdown">
                                                    <a href="/" className="main-menu-link">{'Home'}</a>
                                                </li>
                                                <li className="has-dropdown has-megaitem">
                                                    <a href="/shop">{'SHOP'} <i className="fa fa-angle-down"></i></a>
                                                    <div className="mega-menu">
                                                        <ul className="mega-menu-inner">
                                                            {categories.map((item, index) => (
                                                                <li className="mega-menu-item" key={index}>
                                                                    <p className="mega-menu-item-title">{item.name}</p>
                                                                    <ul className="mega-menu-sub">
                                                                        {item?.subCategory.map((datas, index) => (
                                                                            <li onClick={() => onPressCategory(item)} key={index}><Link to={'#!'}>{datas.name}</Link></li>
                                                                        ))}

                                                                    </ul>
                                                                </li>

                                                            ))}
                                                            <li className="mega-menu-item">
                                                                <div className="menu-banner">
                                                                    <Link to="/shop" className="menu-banner-link">
                                                                        <img className="menu-banner-img" src={'https://andshop-reactjs.netlify.app/static/media/nav_banner.e87f5849.png'} alt="img" />
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="has-dropdown">
                                                    {/*<a href="/about" className="main-menu-link">{'About Us'}</a>*/}
                                                    <Link to="/about" className="menu-banner-link">About Us</Link>
                                                </li>
                                                <li className="has-dropdown">
                                                    <a href="/contact-one" className="main-menu-link">{'Contact Us'}</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    <ul className="header-action-link action-color--black action-hover-color--golden">
                                        {
                                            favorites &&
                                            <li>
                                                {favorites?.products.length
                                                    ? <a href="#offcanvas-wishlish" className="offcanvas-toggle" onClick={handleWish}><i className="fa fa-heart"></i><span className="item-count">{favorites.products.length}</span></a>
                                                    : <a href="#offcanvas-wishlish" className="offcanvas-toggle"><i className="fa fa-heart"></i><span className="item-count">{favorites.products.length}</span></a>
                                                }
                                            </li>
                                        }
                                        {
                                            cart &&
                                            <li>
                                                {cartProducts?.length
                                                    ? <a className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-shopping-bag"></i><span className="item-count">{cartProducts.length}</span></a>
                                                    : <a className="offcanvas-toggle"><i className="fa fa-shopping-bag"></i><span className="item-count">{cartProducts.length}</span></a>
                                                }
                                            </li>
                                        }

                                        <li>
                                            <a href="#search" className="search_width" onClick={handleSearch} >
                                                <img src={svgsearch} alt="img" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#offcanvas-about" className="offacnvas offside-about offcanvas-toggle" onClick={handleabout}>
                                                <i className="fa fa-bars"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mobile-header sticky-header sticky-color--golden mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">

                            <div className="mobile-header-left">
                                <ul className="mobile-menu-logo">
                                    <li>
                                        <Link to="/">
                                            <div className="logo">
                                                <img src={logo} alt="logo" />
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="mobile-right-side">
                                <ul className="header-action-link action-color--black action-hover-color--golden">
                                    <li>
                                        <a href="#!" className="search_width" onClick={handleSearch}>
                                            <img src={svgsearch} alt="img" />
                                        </a>
                                    </li>
                                    {/*<li>*/}
                                    {/*    {favorites?.length*/}
                                    {/*        ? <a href="#offcanvas-wishlish" className="offcanvas-toggle" onClick={handleWish}><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>*/}
                                    {/*        : <a href="#offcanvas-wishlish" className="offcanvas-toggle"><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>*/}
                                    {/*    }*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                    {/*    {carts?.length*/}
                                    {/*        ? <a href="#!" className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>*/}
                                    {/*        : <a href="#!" className="offcanvas-toggle"><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>*/}
                                    {/*    }*/}
                                    {/*</li>*/}
                                    <li>
                                        <a href="#!" className="offcanvas-toggle offside-menu" onClick={handlemenu}>
                                            <i className="fa fa-bars"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="mobile-menu-offcanvas" className="offcanvas offcanvas-rightside offcanvas-mobile-menu-section">

                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handlemenu}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-mobile-menu-wrapper">
                    <div className="mobile-menu-bottom">
                        <div className="offcanvas-menu">
                            <ul>
                                <li>
                                    <a href="#!" onClick={() => handleShow("home")}><span>Home</span></a>
                                    {
                                        show === "home" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/">Fashion</Link></li>
                                                <li><Link to="/furniture">Furniture</Link></li>
                                                <li><Link to="/electronics">Electronics</Link></li>
                                            </ul> : null
                                    }

                                </li>
                                <li >
                                    <a href="#!" onClick={() => handleShow("shop")}><span>Shop</span></a>
                                    {
                                        show === "shop" ? <>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Shop Layout</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/shop">Shop Four Grid</Link></li>
                                                        <li><Link to="/shopTwo">Shop Three Grid</Link></li>
                                                        <li><Link to="/shoplist">Shop List View</Link></li>
                                                        <li><Link to="/shop-left-bar">Shop Left Sidebar</Link></li>
                                                        <li><Link to="/shop-right-bar">Shop Right Sidebar</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Shop Pages</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/cart">Cart View One</Link></li>
                                                        <li><Link to="/cartTwo">Cart View Two </Link></li>
                                                        <li><Link to="/empty-cart">Empty Cart</Link></li>
                                                        <li><Link to="/checkout-one">Checkout View One</Link></li>
                                                        <li><Link to="/checkout-two">Checkout View Two</Link></li>
                                                        <li><Link to="/wishlist">Wishlist</Link></li>
                                                        <li><Link to="/compare">Compare</Link></li>
                                                        <li><Link to="/order-tracking">Order Tracking</Link></li>
                                                        <li><Link to="/order-complete">Order Complete</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Product Single</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/product-details-one/1">Product Single</Link></li>
                                                        <li><Link to="/product-details-two/1">Product Single Two</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </> : null
                                    }

                                </li>
                                <li>
                                    <a href="#!" onClick={() => handleShow("feature")}><span>Feature</span></a>
                                    {
                                        show === "feature" ?

                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/product-hover">Product Hover</Link></li>
                                                <li><Link to="/order-success">Order Success</Link></li>
                                                <li><Link to="/email-template-one">Email Template 1</Link></li>
                                                <li><Link to="/email-template-two">Email Template 2</Link></li>
                                                <li><Link to="/email-template-three">Email Template 3</Link></li>
                                                <li><Link to="/lookbooks">LookBook</Link></li>
                                                <li><Link to="/invoice-one">Invoice 1</Link></li>
                                                <li><Link to="/invoice-two">Invoice 2</Link></li>
                                            </ul>

                                            : null
                                    }
                                </li>
                                <li>
                                    <a href="#!" onClick={() => handleShow("blogs")}><span>Blogs</span></a>
                                    {
                                        show === "blogs" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/blog-grid-three">Blog Grid View One</Link></li>
                                                <li><Link to="/blog-grid-two">Blog Grid View Two</Link></li>
                                                <li><Link to="/blog-list-view">Blog List View</Link></li>
                                                <li><Link to="/blog-single-one">Blog Single View One </Link></li>
                                                <li><Link to="/blog-single-two">Blog Single View TWo</Link></li>
                                            </ul>
                                            : null
                                    }
                                </li>
                                <li>
                                    <a href="#!" onClick={() => handleShow("pages")}><span>Pages</span></a>

                                    {
                                        show === "pages" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/about">About Us</Link></li>
                                                <li><Link to="/vendor-dashboard">Vendor</Link></li>
                                                <li><Link to="/my-account">My Account</Link></li>
                                                <li><Link to="/contact-one">Contact Us One</Link></li>
                                                <li><Link to="/contact-two">Contact Us Two</Link></li>
                                                <li><Link to="/coming-soon">Coming Soon</Link></li>
                                                <li><Link to="/faqs">Frequently Questions</Link></li>
                                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                                <li><Link to="/error">404 Page</Link></li>
                                                <li><Link to="/login">Login</Link></li>
                                            </ul>
                                            : null
                                    }
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="mobile-contact-info">
                        <div className="logo">
                            <Link to="/"><img src={logoWhite} alt="img" /></Link>
                        </div>
                        <address className="address">
                            <span>Address: Your address goes here.</span>
                            <span>Call Us: 0123456789, 0123456789</span>
                            <span>Email: demo@example.com</span>
                        </address>
                        <ul className="social-link">
                            <li>
                                <a href="#!"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                        <ul className="user-link">
                            <li><Link to="/wishlist">Wishlist</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/checkout-one">Checkout</Link></li>
                        </ul>
                    </div>

                </div>

            </div>
            <div id="offcanvas-about" className="offcanvas offcanvas-rightside offcanvas-mobile-about-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleabout}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="mobile-contact-info">
                    <address className="address">
                        <img src={logoWhite} alt="logo" />
                        <span>Address: Your address goes here.</span>
                        <span>Call Us: 0123456789, 0123456789</span>
                        <span>Email: demo@example.com</span>
                    </address>
                    <ul className="social-link">
                        <li>
                            <a href="#!"><i className="fa fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-linkedin"></i></a>
                        </li>
                    </ul>
                    <ul className="user-link">
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/checkout-one">Checkout</Link></li>
                    </ul>
                </div>
            </div>

            <div id="offcanvas-add-cart" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleClick}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-add-cart-wrapper">
                    <h4 className="offcanvas-title">Shopping Cart</h4>
                    <ul className="offcanvas-cart">
                        {cartProducts.map((data, index) => (
                            <li className="offcanvas-wishlist-item-single" key={index}>
                                <div className="offcanvas-wishlist-item-block">
                                    <Link to={`/product-details-one/${data.product_ID}`} className="offcanvas-wishlist-item-image-link" >
                                        <img src={data.portfolioImage} alt="img"
                                            className="offcanvas-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas-wishlist-item-content">
                                        <Link to={`/product-details-one/${data.product_ID}`} className="offcanvas-wishlist-item-link">{data.name.substring(0, 25)}{data.name.length < 25 ? '' : '...'}</Link>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">{data.qty || 1} x
                                            </span>
                                            <span className="offcanvas-wishlist-item-details-price"> ${data.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas-wishlist-item-delete text-right">
                                    <a className="offcanvas-wishlist-item-delete" onClick={() => rmCartProduct(data.product_ID)}><i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="offcanvas-cart-total-price">
                        <span className="offcanvas-cart-total-price-text">Subtotal:</span>
                        <span className="offcanvas-cart-total-price-value">${cart?.subtotal}</span>
                    </div>
                    <ul className="offcanvas-cart-action-button">
                        <li>
                            <Link to="/cart" className="theme-btn-one btn-black-overlay btn_md">View Cart</Link>
                        </li>
                        <li>
                            <Link to="/checkout-one" className="theme-btn-one btn-black-overlay btn_md">Checkout</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="offcanvas-wishlish" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleWish}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-wishlist-wrapper">
                    <h4 className="offcanvas-title">Wishlist</h4>

                    <ul className="offcanvas-wishlist">
                        {favProducts?.map((data, index) => {
                            return (
                                <li className="offcanvas-wishlist-item-single" key={index}>
                                    <div className="offcanvas-wishlist-item-block">
                                        <Link to={`/product-details-one/${data.product_ID}`} className="offcanvas-wishlist-item-image-link" >
                                            <img src={data?.portfolioImage} alt="img"
                                                className="offcanvas-wishlist-image" />
                                        </Link>
                                        <div className="offcanvas-wishlist-item-content">
                                            <Link to={`/product-details-one/${data.product_ID}`} className="offcanvas-wishlist-item-link">{data.name.substring(0, 25)}{data.name.length < 25 ? '' : '...'}</Link>
                                            <div className="offcanvas-wishlist-item-details">
                                                <span className="offcanvas-wishlist-item-details-price">${data.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="offcanvas-wishlist-item-delete text-right">
                                        <a className="offcanvas-wishlist-item-delete" onClick={() => rmFavProduct(data.product_ID)}><i className="fa fa-trash"></i></a>
                                    </div>
                                </li>
                            )}
                        )}
                    </ul>
                    <ul className="offcanvas-wishlist-action-button">
                        <li>
                            <Link to="/wishlist" className="theme-btn-one btn-black-overlay btn_md">View wishlist</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="search" className="search-modal">
                {
                    objectDetectionView ?
                    <div>
                        <button type="button" className="close" onClick={() => setObjectDetectionView(!objectDetectionView)}><img src={svg} alt="icon" /></button>
                        <ObjectDetection addItemInList={addItemInList} />

                        {
                            <div style={{ position: 'fixed', top: 90, right: 220}}>
                                {
                                    items.map((i, index) => {
                                        return(
                                            <button style={style.itemContainer} onClick={() => {
                                                setsearchQuery(i.class);
                                                setObjectDetectionView(!objectDetectionView);
                                            }}>
                                                <div style={style.item}>
                                                    {i.class}
                                                </div>
                                            </button>
                                        );
                                    })
                                }
                            </div>
                        }
                    </div>
                        :
                    <div>
                        <button type="button" className="close" onClick={handleSearch}><img src={svg} alt="icon" /></button>
                        <form style={{display: 'contents'}} onSubmit={(e) => { e.preventDefault(); handleSearch(); Swal.fire('Success', 'Check out the Results', 'success'); history.push('/shop') }}>
                            <input
                                onclose={() => setsearchQuery('')}
                                value={searchQuery} type="search"
                                placeholder="type keyword(s) here"
                                required
                                style={{width: 290, marginRight: 10}}
                                onChange={e => setsearchQuery(e.target.value)}
                            />
                            <button type="submit" className="btn btn-lg btn-main-search">Search</button>
                        </form>
                        <div style={{display: 'flex', width: 400, justifyContent: 'space-around'}}>
                            <button style={style.cameraDiv} onClick={() => setObjectDetectionView(!objectDetectionView)}>
                                <i className="fa fa-camera" style={{color: colors.primary, fontSize: 30}}></i>
                            </button>
                            <div style={style.cameraDiv} onClick={() => SpeechRecognition.startListening()}>
                                <button style={{backgroundColor: 'transparent'}}  onClick={() => SpeechRecognition.startListening()}>
                                    <i className="fa fa-microphone" style={{color: colors.primary, fontSize: 30}}></i>
                                </button>
                            </div>
                        </div>
                        {/*<button style={style.cameraDiv} onClick={() => setObjectDetectionView(!objectDetectionView)}>*/}
                        {/*    <i className="fa fa-camera" style={{color: colors.primary, fontSize: 30}}></i>*/}
                        {/*</button>*/}
                        {/*<button style={style.cameraDiv} onClick={() => setObjectDetectionView(!objectDetectionView)}>*/}
                        {/*    <i className="fa fa-camera" style={{color: colors.primary, fontSize: 30}}></i>*/}
                        {/*</button>*/}
                    </div>
                }
            </div>
        </>
    )
}

const style = {
    cameraDiv: {
        padding: 30,
        border: `1px solid ${colors.primary}`,
        borderRadius: '200%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
        backgroundColor: 'transparent'
    },
    itemContainer: {
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    item: {
        color: 'black',
        fontSize: 15,
    }
}

export default Header
