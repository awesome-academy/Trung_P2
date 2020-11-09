import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from "react-redux";
import {CalcTotalMoneyCart} from "../common/logics/UsersLogic";
import {GetValCartHover} from "../actions/UsersAction";
import {UpdateDataWithType } from "../actions/Common";
import FormCheckout from "./FormCheckout";
export function PaymentDetail(props) {
    const[date, setDate] = useState();
    let {value, data, price} = props;
    useEffect(() => {
        let now = new Date();
        now.setMonth((now.getMonth() + 1 ));
        console.log(now);
        if(value === "fast"){
            now.setHours(now.getHours() + 4);
        } else if(value === 'normal'){
            now.setDate(now.getDate() + 3);
        } else {
            now.setDate(now.getDate() + 1);
        }
        let date = now.toLocaleDateString('default', {'weekday' : 'long'}) + ', ' + now.getDate() + '/' + now.getMonth();
        setDate(date);
    }, [value]);

    return (
        <div className="payment__detail"><p className="payment__detail-title payment__detail-title--color">{date && `Giao vào ${date}`}</p>
            <ul className="payment__detail-group">
                { 
                    data.length > 0 && data.map(item => (
                        <li className="payment__detail-item" key={item.item.id}>{ item.quantity} x {item.item.name}</li>
                    )) 
                }
            </ul>
            <p className="payment__detail-title">Giao { value }</p><span className="payment__detail-cost">${ price }</span>
        </div>
    )
}

export default function Checkout() {
    const dispatch = useDispatch();
    const [trans, setTrans] = useState("normal");
    const valueCart = useSelector(state => state.users.cartHover);
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
    let numberOfCart = CalcTotalMoneyCart(valueCart, cart);
    const handleChangeTransport = event => {
        let isCheck = event.target.checked;
        let value = event.target.value;
        isCheck && setTrans(value);
    }

    useEffect(() => {
        if(cart) {
            let search = cart.reduce((result, item) =>  result += `&id=${item.id}`, "");
            search ? dispatch(GetValCartHover( 'products?_expand=categorie' + search, cart)) 
                    : dispatch(UpdateDataWithType([], 'FETCH_PRODUCT_HOVER_CART'));
        }
    }, []);

    return (
        <section className="payment container d-flex justify-content-between">
            <section className="payment__left">
                <div className="payment__block">
                    <p className="payment__title">1. Chọn hình thức giao hàng</p>
                    <div className="payment__group">
                        <form className="form">
                            <div className="form__group form__transport">
                                <input className="payment__input" defaultValue="fast" checked={trans === "fast" ? true : false} onChange={handleChangeTransport} type="radio" name="transport" />
                                <label >Giao Ngay 2H - 3H</label>
                                { 
                                    trans === "fast" && <PaymentDetail value={trans} data={valueCart} price={numberOfCart} />
                                }
                            </div>
                            <div className="form__group form__transport">
                                <input className="payment__input" defaultValue="day" checked={trans === "day" ? true : false} onChange={handleChangeTransport} type="radio" name="transport" />
                                <label > Giao Trong Ngày</label>
                                { 
                                    trans === "day" && <PaymentDetail value={trans} data={valueCart} price={numberOfCart} />
                                }
                            </div>
                            <div className="form__group form__transport">
                                <input className="payment__input" checked={trans === "normal" ? true : false} onChange={handleChangeTransport} defaultValue="normal" type="radio" name="transport" />
                                <label >Giao tiêu chuẩn</label>
                                { 
                                    trans === "normal" && <PaymentDetail value={trans} data={valueCart} price={numberOfCart} />
                                }
                            </div>
                        </form>
                    </div>
                    <div className="payment__block">
                        <p className="payment__title">2. Chọn hình thức thanh toán</p>
                        <div className="payment__group">
                            <form className="form">
                                <div className="form__group">
                                    <input className="payment__input" type="radio" name="pay" defaultValue="normal" />
                                    <label >Thanh toán tiền mặt khi nhận hàng</label>
                                </div>
                                <div className="form__group">
                                    <input className="payment__input" type="radio" name="pay" defaultValue="master" />
                                    <label > Thanh toán bằng thẻ quốc tế Visa, Master, JCB</label>
                                </div>
                                <div className="form__group">
                                    <input className="payment__input" type="radio" name="pay" defaultValue="atm" />
                                    <label >Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)</label>
                                </div>
                                <div className="form__group">
                                    <input className="payment__input" type="radio" name="pay" defaultValue="momo" />
                                    <label >Thanh toán bằng ví MoMo </label>
                                </div>
                                <div className="form__group">
                                    <input className="payment__input" type="radio" name="pay" defaultValue="zalo" />
                                    <label >Thanh toán bằng ZaloPay</label>
                                </div>
                                <div className="form__group">
                                    <input className="payment__input" type="radio" name="pay" defaultValue="vis" />
                                    <label >Thẻ quốc tế SHB Visa giảm 100.000đ cho đơn hàng từ 500.000đ </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="payment__right rounded">
                <FormCheckout />
            </section>
        </section>

    )
}
