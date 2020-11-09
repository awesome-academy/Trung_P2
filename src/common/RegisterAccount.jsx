import { useFormik } from 'formik';
import React from 'react'
import Login from './Login';
import * as Yup from 'yup';
import FetchData from './Api';
import { Alert } from './Alert';
export default function RegisterAccount() {
    let regular = /^0[1-9][0-9]{8}$/;
    let formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: "",
            email: '',
            password: '',
            phone: ''
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required(),
            last_name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            phone: Yup.string().matches(regular, 'incorrect a phone number').required()
        }),
        onSubmit: async (values, { setErrors, resetForm }) => {
            console.log(values);
            let { email } = values;
            let urlCheckExistMail = `users?email=${email}`;
            let isExistEmail = await FetchData(urlCheckExistMail)().then(res => res.data);
            if (isExistEmail.length == 0) {
                values.roleId = 2;
                let urlCreateUser = 'users';
                FetchData(urlCreateUser)('POST', values).then( res => (res.status > 200 && res.status < 300) ? Alert("success") : Alert("error"));
                resetForm();
            } else {
                setErrors({ extEmail: 'Email da ton tai' })
            }
        }
    })

    return (
        <div className="customer-register">
            <div className="row">
                <div className="col-6">
                    <Login />
                </div>
                <div className="col-6">
                    <div className="form-login form-register">
                        <p className="form-login__title">New Customer</p>
                        <form action="" >
                            <div className="form-login__group">
                                <label htmlFor="" className="form-login__label"> First Name <span className="col-red">*</span></label>
                                <input type="text" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} placeholder="First Name" />
                                {
                                    formik.errors.first_name && (<span className="error-message">{formik.touched.first_name && formik.errors.first_name}</span>)
                                }
                            </div>
                            <div className="form-login__group">
                                <label htmlFor="" className="form-login__label"> Last Name <span className="col-red">*</span></label>
                                <input type="text" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} placeholder="Last Name" />
                                {
                                    formik.errors.last_name && (<span className="error-message">{formik.touched.last_name && formik.errors.last_name}</span>)
                                }
                            </div>
                            <div className="form-login__group">
                                <label htmlFor="" className="form-login__label"> Phone <span className="col-red">*</span></label>
                                <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} placeholder="Phone" />
                                {
                                    formik.errors.phone && (<span className="error-message">{formik.touched.phone && formik.errors.phone}</span>)
                                }
                            </div>
                            <div className="form-login__group">
                                <label htmlFor="" className="form-login__label"> Email <span className="col-red">*</span></label>
                                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email" />
                                {
                                    formik.errors.email && (<span className="error-message">{formik.touched.email && formik.errors.email}</span>)
                                }
                            </div>
                            <div className="form-login__group">
                                <label htmlFor="" className="form-login__label"> Password <span className="col-red">*</span></label>
                                <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" />
                                {
                                    formik.errors.password && (<span className="error-message">{formik.touched.password && formik.errors.password}</span>)
                                }
                            </div>
                            {
                                formik.errors.extEmail && (<span className="error-message">{formik.errors.extEmail}</span>)
                            }
                            {/* <button type="button" onSubmit={formik.handleSubmit} value="Create Acount" className="btn btn-create-acount" /> */}
                            <button type="submit" onClick={formik.handleSubmit} className="mt-5 btn-checkout btn-checkout-format  w-100 d-block">
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
