import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RemoveProInCart, CalcNumberCart, CalcTotalMoneyCart, UpdateToCart } from "../common/logics/UsersLogic";
import { UpdateDataWithType } from "../actions/Common";
import { GetValCartHover } from "../actions/UsersAction";
import { Comfirm } from "../common/Alert";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import { Link } from 'react-router-dom';
// import {}
export default function Cart() {
    const [products, setProducts] = useState([]);
    const { t } = useTranslation(['common']);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const data = useSelector(state => state.users.cartHover);
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;

    useEffect(() => {
        if ((data.length > 0) && cart) {
            let result = CalcTotalMoneyCart(data, cart);
            setTotal(result.toFixed(2));
        }
    }, [data, cart]);

    const CartHover = () => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
        if (cart) {
            let search = cart.reduce((result, item) => result += `&id=${item.id}`, "");
            search ? dispatch(GetValCartHover('products?_expand=categorie' + search, cart))
                : dispatch(UpdateDataWithType([], 'FETCH_PRODUCT_HOVER_CART'));
        }
    }

    const handleRemoveProInCart = async (event) => {
        event.preventDefault();
        let valQ = t('common:qRem');
        let valComFirm = await Comfirm(valQ);
        if (valComFirm.isConfirmed) {
            let id = event.target.getAttribute("data-id");
            RemoveProInCart(id);
            CartHover();
            let numberOfCart = CalcNumberCart();
            dispatch(UpdateDataWithType(numberOfCart, 'GET_NUMBER_OF_CART'));
        }
    }

    const handleUpdateQuantity = async (event) => {
        event.preventDefault();
        let id = event.target.getAttribute("data-id");
        let className = `quantity_${id}`;
        let quantity = document.getElementsByClassName(className)[0].value;

        UpdateToCart(id, parseInt(quantity));
        let numberOfCart = CalcNumberCart();
        dispatch(UpdateDataWithType(numberOfCart, 'GET_NUMBER_OF_CART'));
    }

    return (
        <div className="cart mb-5">
            <div className="row mb-4">
                <div className="cart__title">Your Cart</div>
                <div className="countinue-shopping ml-auto">
                    <a href="/colections" >
                        Continue Shopping
                        <i className="fa fa-angle-right ml-1" ></i>
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-9">
                    <div className="cart__products">
                        {
                            data.length > 0 ? data.map(item => (
                                <div className="product mb-3 d-flex align-items-center" key={item.item.id}>
                                    <a href="" className="product__link">
                                        <img src={item.item.img} alt={item.item.name} className="product__img" />
                                    </a>
                                    <div className="ml-4 product__info d-inline-block">
                                        <h2>
                                            <a href="" className="product__link-name">{item.item.name}</a>
                                        </h2>
                                        <span className="product__des">{item.item.categorie.name}</span>
                                        <span className="product__price d-block">${item.item.price}</span>
                                        <form action="" className="d-inline-block">
                                            <label className="product-detail__title" >Quantity </label>
                                            <input type="number" defaultValue={item.quantity} className={`product-detail__inp  quantity_${item.item.id}`} min={1} />
                                        </form>
                                        <button type="button" onClick={handleUpdateQuantity} data-id={item.item.id} className="btn-add-cart d-inline-block">
                                            Update
                                        </button>
                                        <button type="button" onClick={handleRemoveProInCart} data-id={item.item.id} className="btn-add-cart btn-remove ml-4 d-inline-block">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )) : <p className="text-center">Your cart is current empty.</p>
                        }
                    </div>
                </div>
                <div className="col-3 pl-0">
                    {
                        data.length > 0 && (
                            <div className="cart__wapper">
                                <div className="cart__info rounded">
                                    <div className="d-flex">
                                        <span className="cart__info-total cart__info-title d-inline-block">Total</span>
                                        <span className="cart__info-total cart__price d-inline-block ml-auto">$ {total}</span>
                                    </div>
                                    <Link to="/checkout/payment" className="btn-checkout my-5 w-100 d-block">
                                        Process To Checkout
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                    <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/trust_800x-compressor_800x_71db01ac-43db-4058-b51a-3d02ee6a782b_800x.png?v=1570592547" className="w-100 mt-4" alt="img" />
                </div>
            </div>
        </div>
    )
}
