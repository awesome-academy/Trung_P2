import React from 'react';
import { useFormik } from "formik";
import FetchData from "../common/Api";
import {useHistory} from "react-router-dom";
export default function Login(props) {
    let his = useHistory();
    const formik = useFormik({
        initialValues: {
            email : '',
            password : ''
        },
        onSubmit : (values) => {
            let prePath = props.location?.state?.path;
            FetchData("login")("post", values).then(res => {
                if(res.status >= 200 && res.status < 300){
                    localStorage.setItem("token", res.data.access_token)
                    prePath && his.push(prePath.slice(1));
                }
            }); 
        }
    })
    return (
        <div className="form-login" id="formLogin"> 
            <p className="form-login__title">Login</p>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-login__group">
                    <label htmlFor="" className="form-login__label"> Email Address <span className="col-red">*</span></label>
                    <input type="text" name="email" placeholder="Email Address"  onChange = {formik.handleChange} value={formik.values.email}/>
                </div>
                <div className="form-login__group">
                    <label htmlFor="" className="form-login__label"> Password <span className="col-red">*</span></label>
                    <input type="password" name="password" placeholder="Password" onChange = {formik.handleChange} value={formik.values.password}/>
                </div>
                <input type="submit" value="Login" className="btn btn-login"/>
                <a href="" className="forget-password">Forgot your password?</a>
                <input type="button" value="Create Acount" className="btn btn-create-acount"/>
            </form>
        </div>
    )
}
