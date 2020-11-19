import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import FetchData from '../common/Api';
import * as Yup from "yup";
import {Alert} from "../common/Alert";
export default function FormCustomerAccount() {
    const [isChangePass, setIsChangePass] = useState(false);
    const [values, setValues] = useState();
    let userID = localStorage.getItem('info_user') && JSON.parse(localStorage.getItem('info_user')).userId;
    let regular = /^0[1-9][0-9]{8}$/;
    const handleIsChangePass = event =>{
        let {checked} = event.target;
        checked ? setIsChangePass(true) : setIsChangePass(false);
    }

    useEffect(() => {
        let url = "users/" + userID;
        FetchData(url)().then(res => setValues(res.data));
    }, []);

    const formik = useFormik({
        enableReinitialize : true,
        initialValues : {
            email: values?.email,
            first_name: values?.first_name,
            last_name: values?.last_name,
            phone: values?.phone,
            password : '',
            old_password : ''
        },
        validationSchema : Yup.object({
            email: Yup.string().required(),
            first_name :Yup.string().required(),
            last_name : Yup.string().required(),
            phone : Yup.string().matches(regular, 'invalid a phone number')
        }),
        onSubmit : async (values, {setErrors, setSubmitting}) => {
            if(isChangePass){
                let {old_password} = values;
                let url = `users?id=${userID}&password=${old_password}`;
                let check = await FetchData(url)().then(res => res.data);
                if(check.length > 0){
                    delete values.old_password;
                    values.roleId = check[0].roleId;
                    FetchData(`users/${userID}`)('PUT', values).then( res => {
                        Alert('success');
                    });
                } else {
                    setErrors({'old_password' : "password incorrect!"})
                    setSubmitting(false)
                }
            } else {
                let url = `users?id=${userID}`;
                let check = await FetchData(url)().then(res => res.data);
                delete values.old_password;
                values.password = check[0].password;
                values.roleId = check[0].roleId
                FetchData(`users/${userID}`)('PUT', values).then( res => {
                    Alert('success');
                });
            }
        }
    })

    return (
        <>
            <p className="register__title">Thông tin cá nhân</p>
            <div className="customers__wrapper mt-4">
                <section className="register mt-3 container info-user-buy__form--format">
                    <form className="register__form-info-user" >
                        <div className="customers__name d-flex justify-content-between">
                            <div className="register__form-group d-inline-block">
                                <label className="register__lable-input" >First Name</label>
                                <input className="register__input" type="text" onChange={formik.handleChange} value={formik.values.first_name || ''}  name="first_name" required placeholder="Le Van A" />
                                <span className="error-message">{formik.touched.first_name && formik.errors.first_name}</span>
                            </div>
                            <div className="register__form-group d-inline-block">
                                <label className="register__lable-input" >Last Name</label>
                                <input className="register__input" type="text" onChange={formik.handleChange} value={formik.values.last_name || ''} name="last_name" required placeholder="Le Van A" />
                                <span className="error-message">{formik.touched.last_name && formik.errors.last_name}</span>
                            </div>
                        </div>
                        <div className="register__form-group">
                            <label className="register__lable-input" htmlFor="sdt">Phone number</label>
                            <input className="register__input" name="phone" onChange={formik.handleChange} value={formik.values.phone || ''} type="text" id="sdt" required placeholder="0675361981" />
                            <span className="error-message">{formik.touched.phone && formik.errors.phone}</span>

                        </div>
                        <div className="register__form-group">
                            <label className="register__lable-input" htmlFor="email">Email</label>
                            <input className="register__input" name="email" onChange={formik.handleChange} value={formik.values.email || ''} type="email" id="text" placeholder="abc@gmail.com" />
                            <span className="error-message">{formik.touched.email && formik.errors.email}</span>
                        </div>
                        <div className="register__form-group">
                            <input type="checkbox" onChange={handleIsChangePass} name="change_password" />
                            <label className="register__lable-input ml-3">Change Password</label>
                            
                        </div>
                        {
                            isChangePass && (
                                <>
                                    <div className="register__form-group">
                                        <label className="register__lable-input" >Old Password<span className="register__maker">*</span></label>
                                        <input className="register__input" name="old_password" onChange={formik.handleChange}  type="password" placeholder="Old Password" />
                                        <span className="error-message">{formik.touched.old_password && formik.errors.old_password}</span>
                                    </div>
                                    <div className="register__form-group">
                                        <label className="register__lable-input" >New Password<span className="register__maker">*</span></label>
                                        <input className="register__input" name="password" onChange={formik.handleChange} type="password" placeholder="New Password" />
                                    </div>
                                </>
                            )
                        }
                        <button type="submit" onClick={formik.handleSubmit} className=" btn-checkout-format  w-100 d-block">
                            Process To Checkout
                        </button>
                    </form>
                </section>
            </div>
        </>
    )
}
