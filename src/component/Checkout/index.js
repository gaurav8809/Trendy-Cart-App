import React, {useState} from 'react'
import YourOrders from './YourOrders'
import {
    addProductIntoOrder, getCartData,
} from "../../redux/slices/userSlice";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Checkout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.user.cart);
    let tempCart = _.omit(cart, ['products']);
    tempCart['products'] = [];

    const onClickPayment = async () => {
        let payload = {
            cart,
            user,
            paymentMethod,
            status: paymentMethod === 'Mobile Transfer' ? 'Pending' : 'Complete'
        };
        let response = await dispatch(addProductIntoOrder(payload));
        if(response) {
            Swal.fire({
                icon: 'success',
                title: 'Order placed successfully',
            }).then(async () => {
                history.push('/order-success')
                await dispatch(getCartData(user.user_ID));
            });
        }
    }

    return (
        <>
            <section id="checkout_one" className="ptb-100">
                <div className="container">
                    <div className="row">
                        {/*<BillingsInfo />*/}
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <YourOrders />
                            <div className="order_review bg-white">
                                <div className="check-heading">
                                    <h3>Payment</h3>
                                </div>
                                <div className="payment_method">
                                    <form onSubmit={(e)=>{e.preventDefault();onClickPayment()}}>
                                        <div className="accordion" id="accordionExample">
                                            <div className="payment_area_wrappers">
                                                <div className="heading_payment" id="headingOne">
                                                    <div className="" data-toggle="collapse" data-target="#collapseOne" >
                                                        <input type="radio" name="payment" id="html" value="HTML" defaultChecked onChange={() => setPaymentMethod('Bank Transfer')}/>
                                                        <label htmlFor="html">Direct Bank Transfer</label>
                                                    </div>
                                                </div>
                                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="payment_body">
                                                        <p>Direct Bank Transfer</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="payment_area_wrappers">
                                                <div className="heading_payment" id="headingTwo">
                                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                                        <input type="radio" name="payment" id="javascript" value="JavaScript" onChange={() => setPaymentMethod('Mobile Transfer')} />
                                                        <label htmlFor="javascript">Mobile Banking</label>
                                                    </div>
                                                </div>
                                                <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                                                    <div className="payment_body">
                                                        <p>Direct Mobile Transfer</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="payment_area_wrappers">
                                                <div className="heading_payment" id="headingThree">
                                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseThree">
                                                        <input type="radio" name="payment" id="css" value="JavaScript" onChange={() => setPaymentMethod('Paypal')} />
                                                        <label htmlFor="css">Paypal</label>
                                                    </div>
                                                </div>
                                                <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                                                    <div className="payment_body">
                                                        <p>Some placeholder content for the second accordion panel. This panel is hidden by default.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <button className="theme-btn-one btn-black-overlay btn_sm">Place Order</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout
