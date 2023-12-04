import React from 'react'
import { Link } from 'react-router-dom'
import img3 from '../../../assets/img/offer/men.png'

const BannerBottom = () => {
    return (
        <>
        <section id="product_variation_one" style={{paddingTop: 20}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={'https://andshop-reactjs.netlify.app/static/media/woman.285f1a7d.png'} alt="img" />
                        <div className="product_var_one_text">
                            <h4 className="color_one">Outerwear</h4>
                            <h2>New</h2>
                            <h4>Collection</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={'https://andshop-reactjs.netlify.app/static/media/woman1.b58d4262.png'} alt="img" />
                        <div className="product_var_one_text">
                            <h4 className="color_one">Summer</h4>
                            <h2>Hot</h2>
                            <h4>Collection</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={img3} alt="img" />
                        <div className="product_var_one_text_center">
                            <h2 className="color_one">40% Offer</h2>
                            <h4>No Selected Models</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={'https://andshop-reactjs.netlify.app/static/media/woman4.6c41e1ce.png'} alt="img" />
                        <div className="product_var_one_text">
                            <h2>New</h2>
                            <h4 className="color_one">Arrivals</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={'https://andshop-reactjs.netlify.app/static/media/kids.d99e7e66.png'} alt="img" />
                        <div className="product_var_one_text">
                            <h2>Hot</h2>
                            <h4 className="color_one">Offer</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style={style.bannerPadding}/>
        </section>
        </>
    )
}

export default BannerBottom;

const style = {
    bannerPadding: {
        padding: 10,
    },
};
