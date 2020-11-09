import React from 'react';
import { useFormik } from "formik";
import FetchData from "../common/Api";
import { Link, useHistory, useLocation } from "react-router-dom";
export default function Login(props) {
    let his = useHistory();
    let location = useLocation();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values, {setErrors}) => {
            let path =  props.location?.state?.path
            let prePath = props.preUrl ? props.preUrl : path;
            FetchData("login")("post", values).then(responses => {
                if (responses.data.status !== 401) {
                    localStorage.setItem("token", responses.data.access_token);
                    localStorage.setItem("info_user",JSON.stringify( responses.data.info));
                    let { roleId } = responses.data.info;
                    if (prePath) {
                        // prePath = prePath.includes("/colections/") ? prePath.replace("/colections", '') : path;
                        prePath = prePath.includes("/colections/") ? prePath.replace("/colections", '') : path ?? prePath;
                        (roleId === 2 && prePath.includes("/dashboard")) ? his.push('/colections') : his.push(prePath.slice(1));
                    } else {
                        (roleId === 1) && his.push('/dashboard');
                        (roleId === 2) && his.push('/colections');
                    }
                } else {
                    setErrors({email : 'Email or password incorrect'});
                }
            });
        }
    })
    return (
        <div className="form-login form-login--active" id="formLogin">
            <p className="form-login__title">Login</p>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-login__group">
                    <label htmlFor="" className="form-login__label"> Email Address <span className="col-red">*</span></label>
                    <input type="text" name="email" placeholder="Email Address" onChange={formik.handleChange} value={formik.values.email} />
                    {
                        formik.errors.email && (<span className="error-message">{formik.touched.email && formik.errors.email}</span>)
                    }
                </div>
                <div className="form-login__group">
                    <label htmlFor="" className="form-login__label"> Password <span className="col-red">*</span></label>
                    <input type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
                    <span className="error-message">{formik.touched.password && formik.errors.password}</span>
                </div>
                <input type="submit" value="Login" className="btn btn-login" />
                <a href="" className="forget-password">Forgot your password?</a>
                <Link to="/register">
                    <input type="button" value="Create Acount" className="btn btn-create-acount" />
                </Link>
            </form>
        </div>
    )
}
