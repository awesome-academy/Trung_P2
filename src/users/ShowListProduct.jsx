import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import { GetIdCateWithURL, GetBreadCrumb } from "../selectors/UserSelectors";
import { FetchProductSearch, UpdateUrl } from "../actions/UsersAction";
import { UpdateDataWithType } from "../actions/Common";
import { getChildCateClick, GetStatusSortProducts, AddToCart, CalcNumberCart } from "../common/logics/UsersLogic";
import { useRouteMatch, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../translations/i18n"
export default function ShowListProduct(props) {
    const { t } = useTranslation(['users', "trans"]);
    let { path, url } = useRouteMatch();
    const [perPage, setPerPage] = useState(12);
    const [currentPag, setCurrentPag] = useState(1);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    let { nameCate } = props;
    let getIdCate = useSelector(state => GetIdCateWithURL(nameCate)(state));
    const productsCateId = useSelector(state => state.users.listProducts.products);
    const total = useSelector(state => state.users.listProducts.total);
    const getCategories = useSelector(state => state.users.allCate);
    const getUrl = useSelector(state => state.users.url);

    useEffect(() => {

        if (getIdCate) {
            let getChildId = getChildCateClick(getCategories, getIdCate);
            let value = getChildId.reduce((result, item) => {
                return result += `&categorieId=${item}`;
            }, '');
            let url = `products?_expand=categorie${value}&_page=${currentPag}&_limit=${perPage}`;
            dispatch(FetchProductSearch(url));

            dispatch(UpdateUrl(url));
        }

    }, [getIdCate]);

    useEffect(() => {

        if (total) {
            if (parseInt(total) > perPage) {
                let value = parseInt(total) / perPage;
                setPage(Math.ceil(value));
            } else {
                setPage(0);
            }
        }

    }, [total, perPage]);

    const handleChangePerPage = (event) => {
        event.preventDefault();
        let value = +event.target.value;

        //format url per page
        let url = getUrl.split("&_limit=");
        url[1] = '&_limit=' + value;
        let urlFormat = url.join("");

        // format curent page = 1
        let format = urlFormat.slice(urlFormat.indexOf("&_page="), urlFormat.indexOf('&_limit'));
        let customPage = `&_page=1`;
        let result = urlFormat.replace(format, customPage);

        dispatch(FetchProductSearch(result));
        dispatch(UpdateUrl(result));
        setPerPage(value);
        setCurrentPag(1);
    }

    const handleSortProduct = event => {
        event.preventDefault();
        let { value } = event.target;
        let url = getUrl;
        let result = GetStatusSortProducts(value);
        let format = url.slice(url.indexOf("&_sort"), url.indexOf('&_page'));
        let urlFormat = format ? url.replace(format, result) : url.replace("&_page", `${result}&_page`);
        dispatch(FetchProductSearch(urlFormat));
        dispatch(UpdateUrl(urlFormat));
    }

    const handleChangePage = (event, value) => {
        event.preventDefault();
        setCurrentPag(value);
        let url = getUrl;
        let format = url.slice(url.indexOf("&_page="), url.indexOf('&_limit'));
        let customPage = `&_page=${value}`;
        let urlFormat = url.replace(format, customPage);
        dispatch(FetchProductSearch(urlFormat));
        dispatch(UpdateUrl(urlFormat));
    }

    const handleAddToCart = event => {
        event.preventDefault();
        let idPro = event.currentTarget.getAttribute('data-id');
        AddToCart(idPro, 1);
        let numberOfCart = CalcNumberCart();
        dispatch(UpdateDataWithType(numberOfCart, 'GET_NUMBER_OF_CART'));
    }


    return (
        <>
            <div className="contents__filters row align-items-center">
                <div className="col-6">
                    <span className="contents__lble">{t('users:users.result')}: {total} {t('users:users.products')}</span>
                </div>
                <div className="col-6 row align-items-center justify-content-end">
                    <div className="contents__per-page">
                        <form action="" className="contents__form">
                            <label htmlFor=""> {t('users:users.itemPP')} : </label>
                            <select onChange={handleChangePerPage} name="perPage">
                                <option value="12"> 12 </option>
                                <option value="24"> 24 </option>
                            </select>
                        </form>
                    </div>
                    <div className="contents__sort ml-3">
                        <form action="" className="contents__form">
                            <label htmlFor=""> {t('users:users.sortBy')} : </label>
                            <select onChange={handleSortProduct} name="sort">
                                <option value="featured"> {t('users:users.feature')} </option>
                                <option value="desc">  {t('users:users.desc')} </option>
                                <option value="asc">  {t('users:users.asc')} </option>
                                <option value="price_low">  {t('users:users.price_low')} </option>
                                <option value="price_high"> {t('users:users.price_high')}</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
            <div className="contents__products">
                <div className="wrapper__products">
                    {
                        (productsCateId.length > 0) ? productsCateId.map(item => (
                            <div className="block" key={item.id}>
                                <div className="product text-center">
                                    <Link to={url + "/product/" + item.id} >
                                        <img src={item.img} alt={item.name} className="product__img" />
                                    </Link>
                                    <p className="product__cate">{item.categorie.name}</p>
                                    <h2 className="product__heading">
                                        <a href="" className="product__name">{item.name}</a>
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
                                        <span className="product__price-current">${item.price}</span>
                                    </div>
                                    <Link to={url + "/product/" + item.id}>
                                        <button type="button" className="btn-add-cart">
                                            {t('users:users.viewPro')}
                                        </button>
                                    </Link>
                                </div>
                                <button type="button" onClick={handleAddToCart} data-id={item.id} className="btn-add-cart btn-add-to-cart">
                                    {t('users:users.addCart')}
                                </button>
                            </div>
                        )) : <p>Không tìm thấy sản phẩm.</p>
                    }
                </div>
                <div className="pagination mt-3 mb-5">
                    {page ? <Pagination count={page} page={currentPag} onChange={handleChangePage} color="primary" /> : null}
                </div>
            </div>
        </>
    )
}
