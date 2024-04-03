import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import avater from '../../../assets/img/common/avater.png'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';

const TopHeader = () => {
    let dispatch = useDispatch();
    const history = useHistory()

    let user = useSelector((state) => state.user.user);
    const location = useLocation();

    const logout = () => {
        dispatch({ type: "RESET_STORE" })
        // dispatch({ type: "user/resetUser" })
        location.pathname !== '/' && history.push("/");
    }
    return (
        <>
            <section id="top_header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_left">
                                <p>Special collection already available.<Link to="/shop">Read more...</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_right">
                                {
                                    !user ?
                                        <ul className="right_list_fix">
                                            {/*<li><Link to="/compare"><i className="fa fa-refresh"></i> Compare</Link></li>*/}
                                            <li><Link to="/login"><i className="fa fa-user"></i> Login</Link></li>
                                            <li><Link to="/register"><i className="fa fa-lock"></i> Register</Link></li>
                                        </ul>
                                        :
                                        <ul className="right_list_fix">
                                            {/*<li><Link to="/order-tracking"><i className="fa fa-truck"></i> Track your Order</Link></li>*/}
                                            <li className="after_login"><img src={'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg'} alt="avater" /> {user.email.split('@')[0] || 'Guest'} <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    {/*<li><Link to="/my-account"><i className="fa fa-tachometer"></i> Dashboard</Link></li>*/}
                                                    <li><Link to="/my-account/customer-order"><i className="fa fa-cubes"></i> My Orders</Link></li>
                                                    <li><Link to="" onClick={() => { logout() }} ><i className="fa fa-sign-out"></i> Logout</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopHeader
