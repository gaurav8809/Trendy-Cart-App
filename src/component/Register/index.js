import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import {Link, useHistory} from "react-router-dom"
import {authenticate, register} from "../../redux/slices/userSlice";

const RegisterArea = () => {
    let dispatch = useDispatch();

    const history = useHistory()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [conPass, setConPass] = useState('')

    let user = useSelector((state) => state.user.user);

    useEffect(() => {
        user && history.push('/');
    }, []);

    const onClickRegister = async () => {
        let {payload: {status, message}} = await dispatch(register({email, password: pass}));
        if(status === 409) {
            Swal.fire({
                icon: 'error',
                title: message,
                html: 'Please try with different email address',
            });
        } else {
            history.push("/shop");
        }
    }

    return (
        <>
            <section id="login_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3>Register</h3>
                                <form onSubmit={(e)=>{e.preventDefault();onClickRegister()}}>
                                    {/*<div className="default-form-box">*/}
                                    {/*    <label>Username<span className="text-danger">*</span></label>*/}
                                    {/*    <input type="text" className="form-control" value={user} onChange={e => setUser(e.currentTarget.value)} required/>*/}
                                    {/*</div>*/}
                                    <div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.currentTarget.value)} required/>
                                    </div>
                                    <div className="default-form-box">
                                        <label>Password<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" value={pass} onChange={e => setPass(e.currentTarget.value)} required minLength="8"/>
                                    </div>
                                    <div className="default-form-box">
                                        <label>Confirm password<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" value={conPass} onChange={e => setConPass(e.currentTarget.value)} required minLength="8"/>
                                        {
                                            pass.length && conPass.length && pass !== conPass ?
                                            <div style={{color: 'red', paddingTop: 5, fontSize: 13}}>
                                                Confirm password mismatch
                                            </div> : " "
                                        }
                                    </div>
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Register</button>
                                    </div>
                                    <div className="remember_area">
                                        Have an account? <Link to="/login" className="active">Login</Link> here
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterArea
