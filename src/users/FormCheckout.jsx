import React, {useEffect}from 'react';
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { GetValCartHover, UserOrderPro} from "../actions/UsersAction";
import { UpdateDataWithType} from "../actions/Common";
import FetchData from "../common/Api";
import {Alert} from "../common/Alert";
import TextField from '@material-ui/core/TextField';

export default function FormCheckout() {
    const his = useHistory();
    const dispatch = useDispatch();
    let regular = /^0[1-9][0-9]{8}$/;
    let cartHover = useSelector(state => state.users.cartHover);
    let formik = useFormik({
        initialValues:{
            name : '',
            phone : '',
            city : "",
            address : ""
        },
        validationSchema: Yup.object({
            name : Yup.string().required(),
            phone : Yup.string().matches(regular, "invalid a phone number").required(),
            city : Yup.string().required(),
            address : Yup.string().required()
        }),
        onSubmit : async (values) => {
            
            let now = new Date();
            now.setMonth(now.getMonth() + 1);
            let date = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear();

            let userId = JSON.parse(localStorage.getItem('info_user')).userId;
            let {name, address, phone, city} = values;

            let url = "orders";
            let orders = cartHover.map(item => {
                let {quantity} = item;
                let {id, price} = item.item;
                price = price * parseInt(quantity);
                let value = {productId : id, status : 1, quantity, price, userId, date, name, address, phone, city};
                return FetchData(url)('post', value);
            })
            await Promise.all(orders).then(res => {
                localStorage.setItem('cart', []);
                Alert('success');
                dispatch(UpdateDataWithType([], 'FETCH_PRODUCT_HOVER_CART'));
            });
            his.push("/colections/cart");
        }
    });

    useEffect(() => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
        if(cart) {
            let search = cart.reduce((result, item) =>  result += `&id=${item.id}`, "");
            search ? dispatch(GetValCartHover( 'products?_expand=categorie' + search, cart)) 
                    : dispatch(UpdateDataWithType([], 'FETCH_PRODUCT_HOVER_CART'));
        }
    }, []);

    return (
        <section className="register container info-user-buy__form--format">
            <p className="register__title">Thông tin cá nhân:</p>
            <form className="register__form-info-user" >
                <div className="register__form-group">
                    <label className="register__lable-input" htmlFor="name">Full Name <span className="register__maker">*</span></label>
                    <TextField
                        error = { formik.errors.name ? true : false }
                        id="outlined-error"
                        label={formik.errors && formik.errors.name }
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name="name"
                        size="small"
                    />
                </div>
                <div className="register__form-group">
                    <label className="register__lable-input" htmlFor="sdt">Phone number<span className="register__maker">*</span></label>
                    <TextField
                        error = { formik.errors.phone ? true : false }
                        id="outlined-error"
                        label={formik.errors && formik.errors.phone }
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        name="phone"
                        size="small"
                    />
                </div>
                <div className="register__form-group">
                    <label className="register__lable-input" htmlFor="email">City<span className="register__maker">*</span></label>
                    <TextField
                        error = { formik.errors.city ? true : false }
                        id="outlined-error"
                        label={formik.errors && formik.errors.city }
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        name="city"
                        size="small"
                    />
                </div>
                <div className="register__form-group">
                    <label className="register__lable-input" htmlFor="address">Address<span className="register__maker">*</span></label>
                    <TextField
                        error = { formik.errors.address ? true : false }
                        id="outlined-error"
                        label={formik.errors && formik.errors.address }
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        name="address"
                        size="small"
                    />
                </div>
                <button type="submit" onClick={formik.handleSubmit} className="btn-checkout btn-checkout-format  w-100 d-block">
                    Đặt Hàng
                </button>
            </form>
        </section>

    )
}
