import React, {useEffect, useState} from 'react'
import ProductCard from '../Common/Product/ProductCard'
import Filter from './Filter'
import {useDispatch, useSelector} from "react-redux";
import Loading from '../../component/Common/loader';
import {getProducts} from "../../redux/slices/productSlice";
import NO_PRODUCT from "../../assets/img/common/no-product.png";
import {Link} from "react-router-dom";

const Shop = () => {

    let dispatch = useDispatch();
    const {products: appProducts} = useSelector((state) => state.products);
    const {appSearchQuery} = useSelector((state) => state.settings);
    const [products, setProducts] = useState(appProducts);

    useEffect(() => {
        products.length === 0 && getAllRequiredData();
    }, []);

    useEffect(() => {
        if(appSearchQuery) {
            let temp = [];
            products.filter(item => {
                if(item.name.toLowerCase().includes(appSearchQuery.toLowerCase()) || item.description.toLowerCase().includes(appSearchQuery.toLowerCase()) || item.color.toLowerCase().includes(appSearchQuery.toLowerCase())) {
                    temp.push(item);
                }
            })
            setProducts(temp);
        } else {
            setProducts(appProducts);
        }
    },[appSearchQuery]);

    const getAllRequiredData = async () => {
        await dispatch(getProducts());
    };

    // const [products, setProducts] = useState(redProducts);
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];

    const randProduct = (page) => {
        if (page) {
            let data = allData.sort((a, b) => 0.5 - Math.random())
            // setProducts(data);
            setPage(page);
        }
    }

    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <Filter filterEvent={randProduct}/>
                    <div className="row">
                        {
                            products.length ?
                            products?.map((data, index) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={data} />
                                </div>
                            )})
                                :
                                appSearchQuery ?
                                    <div className="container ptb-100">
                                        <div className="row">
                                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                                <div className="empaty_cart_area">
                                                    <img src={NO_PRODUCT} alt="img" style={{height: 200, width: 300}} />
                                                    <h2>PRODUCT NOT FOUND</h2>
                                                    <h3>Sorry Mate... No Item Found according to Your query!</h3>
                                                    <Link onClick={() => dispatch({ type: "settings/setAppSearchQuery", payload: null })} className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : <Loading />
                        }
                        {/*<div className="col-lg-12">*/}
                        {/*    <ul className="pagination">*/}
                        {/*        <li className="page-item" onClick={(e) => { randProduct(page > 1 ? page - 1 : 0) }}>*/}
                        {/*            <a className="page-link" href="#!" aria-label="Previous">*/}
                        {/*                <span aria-hidden="true">«</span>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className={"page-item " + (page === 1 ? "active" : null)} onClick={(e) => { randProduct(1) }}><a className="page-link" href="#!">1</a></li>*/}
                        {/*        <li className={"page-item " + (page === 2 ? "active" : null)} onClick={(e) => { randProduct(2) }}><a className="page-link" href="#!">2</a></li>*/}
                        {/*        <li className={"page-item " + (page === 3 ? "active" : null)} onClick={(e) => { randProduct(3) }}><a className="page-link" href="#!">3</a></li>*/}
                        {/*        <li className="page-item" onClick={(e) => { randProduct(page < 3 ? page + 1 : 0) }}>*/}
                        {/*            <a className="page-link" href="#!" aria-label="Next">*/}
                        {/*                <span aria-hidden="true">»</span>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Shop
