import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {  AddToCart, CalcNumberCart } from "../common/logics/UsersLogic";
import {UpdateDataWithType} from "../actions/Common";
import {useLocation,useRouteMatch, useParams, Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../translations/i18n";

SlickProducts.propTypes = {
    title : PropTypes.string.isRequired,
    data : PropTypes.array.isRequired
}

export default function SlickProducts(props) {
    let {t} = useTranslation(['users']);
    let location = useLocation();
    let loca = location?.pathname;
    let url = props.url ? props.url : (loca.indexOf("/product/") !== -1 ) ? loca.substring(0, loca.lastIndexOf("/")) : loca + '/product';
    const dispatch = useDispatch();
    const [currentClick, setCurrentClick] = useState(0);
    const [values, setValues] = useState([]);
    const [data, setData] = useState([]);
    const handleClickBtn = (event) => {
        event.preventDefault();
        let status = event.currentTarget.getAttribute("data-type");
        let temps = [...data];
        let value;
        if(status === "next"){
            value = temps.splice(currentClick + 1, 4);
            setCurrentClick(currentClick + 1);
        }else{
            value = temps.splice(currentClick - 1, 4);
            setCurrentClick(currentClick - 1);
        }
        setValues(value)
    }

    useEffect(()=>{
        let data = props.data ? props.data : []; 
        let temps = [...data]
        let value = temps.splice(currentClick, 4);
        setValues(value);
        setData(data);
    }, [props.data]);

    const handleAddToCart = event => {
        event.preventDefault();
        let idPro = event.currentTarget.getAttribute('data-id');
        AddToCart(idPro, 1);
        let numberOfCart = CalcNumberCart();
        dispatch(UpdateDataWithType(numberOfCart,'GET_NUMBER_OF_CART'));
    }

    return (
        <>
            <p className="title_slick text-center">{ props.title }</p>
            <div className="wrapper-slick position-relative">
                <button type="button" data-type="prev"  disabled={ (currentClick == 0) ? true: false } onClick={ handleClickBtn } className="btn btn-slick btn-prev" >
                    <i className="fa fa-angle-left" ></i>
                </button>
                <div className="content-slick">

                    {
                        values.map((item, index) => (
                            <div className="block" key={index}> 
                                <div className="product text-center">
                                    <Link to={ url +'/' + item.id }>
                                        <img src={item.img}alt="" className="product__img" />
                                    </Link>
                                    <p className="product__cate"></p>
                                    <h2 className="product__heading">
                                        <Link to={ url +'/' + item.id } className="product__name">{item.name}</Link>
                                    </h2>
                                    <div className="product__rate">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <div className="product__price">
                                        <span className="format-price">$99.00</span>
                                        <span className="product__price-current">$49.00</span>
                                    </div>
                                    <Link to={ url +'/' + item.id }>
                                        <button type="button" className="btn-add-cart">
                                            {t('users:users.viewPro')}
                                        </button>
                                    </Link>
                                </div>
                                <button type="button" onClick={handleAddToCart}  data-id={item.id} className="btn-add-cart btn-add-to-cart">
                                    {t('users:users.addCart')}
                                </button>
                            </div>
                        ))
                    }
                    
                </div>
                <button type="button" onClick={ handleClickBtn } disabled={  data?.length - currentClick <= 4 ? true : false    } data-type="next" className="btn  btn-slick btn-next">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>
        </>
    )
}
