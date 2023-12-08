import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom"
import {authenticate, getCartData, getWishlistData} from "../../redux/slices/userSlice";

const LoginArea = () => {
    let dispatch = useDispatch();
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let user = useSelector((state) => state.user.user);

    useEffect(() => {
        user && history.push('/');
    }, []);

    const onClickLogin = async () => {
        let {payload: {status, message, response}} = await dispatch(authenticate({email, password}));
        if(status === 204 || status === 404) {
            Swal.fire({
                icon: 'error',
                title: message,
                html: 'Please try again!!',
            });
        } else {
            await dispatch(getCartData(response.user_ID));
            await dispatch(getWishlistData(response.user_ID));
            history.push("/shop");
        }
    };

    return (
        <>
            <section id="login_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3>Login</h3>
                                <form onSubmit={(e)=>{e.preventDefault();onClickLogin()}}>
                                    <div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input value={email} onChange={event => setEmail(event.target.value)}
                                               type="email" className="form-control" required
                                        />
                                    </div>
                                    <div className="default-form-box">
                                        <label>Passwords<span className="text-danger">*</span></label>
                                        <input value={password} onChange={event => setPassword(event.target.value)}
                                               type="password" className="form-control" required minLength="8"/>
                                    </div>
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">login</button>
                                    </div>
                                    <div className="remember_area">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="materialUnchecked"/>
                                            <label className="form-check-label" htmlFor="materialUnchecked">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="/register" className="active">Create Your Account?</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginArea
