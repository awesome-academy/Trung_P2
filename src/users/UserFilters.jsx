import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { GetListCates } from "../selectors/UserSelectors";
import { Link } from "react-router-dom";
import { GetFormatUrlSearchPrice, GetUrlFormatSearch } from "../common/logics/UsersLogic";
import { FetchProductSearch, UpdateUrl } from "../actions/UsersAction";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "../translations/i18n";

export default function UserFilters() {
    const { t } = useTranslation(['users', "trans"]);
    const [isCLickBrand, setIsCliCkBrand] = useState(false);
    const [isCLickPrice, setIsCliCkPrice] = useState(false);
    const [isCLickProType, setIsCliCkProType] = useState(false);
    const [isChecked, setIsChecked] = useState({
        'lte_100': false,
        '100_200': false,
        '200_400': false,
        "gte_400": false
    })
    const dispatch = useDispatch();

    let brands = useSelector(state => state.users.listBrands);
    let types = useSelector(state => state.users.listTypes);
    let cates = useSelector(state => GetListCates(state));
    const getUrl = useSelector(state => state.users.url);
    const productsCateId = useSelector(state => state.users.listProducts.products);

    const handleClickPrice = (event) => {
        event.preventDefault();
        setIsCliCkPrice(!isCLickPrice);
    }
    const handleClickProType = (event) => {
        event.preventDefault();
        setIsCliCkProType(!isCLickProType);
    }
    const handleClickBrand = (event) => {
        event.preventDefault();
        setIsCliCkBrand(!isCLickBrand);
    }

    const handleChangePrice = event => {

        let value = event.target.value;
        let check = isChecked[value];
        let url = getUrl;
        let urlFormat = GetFormatUrlSearchPrice(check, url, value);
        console.log(urlFormat)
        dispatch(FetchProductSearch(urlFormat));
        dispatch(UpdateUrl(urlFormat));

        setIsChecked({
            'lte_100': false,
            '100_200': false,
            '200_400': false,
            "gte_400": false,
            [value]: !isChecked[value]
        });
    }


    const handleChangeBrandAndType = (event) => {
        let check = event.target.checked;
        let value = event.target.value;
        let name = event.target.getAttribute("name");
        let url = getUrl;

        let urlFormat = GetUrlFormatSearch(check, url, value, name);
        console.log(urlFormat)
        dispatch(FetchProductSearch(urlFormat));
        dispatch(UpdateUrl(urlFormat));
    }


    return (
        <>
            <div className="filters__categories categories">
                <p className="categories__title filters-title">{t('trans:dashboard.cateCategory')}</p>
                <div className="categories__tree-view">
                    <ul className="categories__list">
                        {
                            cates && cates.map(item => (
                                <Link to={"/colections/" + item.name} className="categories__item d-flex align-items-center" key={item.id}>
                                    <span className="categories__link">{item.name}</span>
                                    <i className="fa fa-angle-right"></i>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="filters__prices prices mt-3">
                <span onClick={handleClickPrice} className="categories__title filters-title d-block">
                    {
                        isCLickPrice ? <i className="fa fa-angle-right mr-2"></i> : <i className="fa fa-angle-down mr-2"></i>
                    }
                    {t('trans:products.labelPrice')}
                </span>
                <div className={isCLickPrice ? "prices__view view--hidden" : "prices__view "}  >
                    <form action="" className="mt-3" key="1">
                        <div className="form-groups mt-1">
                            <input type="checkbox" name="prices" checked={isChecked["lte_100"]} onChange={handleChangePrice} value="lte_100" id="price1" className=" checkbox-format mr-2" />
                            <label htmlFor="price1" className=""> {t('users:users.lesthan')} $100.00 </label>
                        </div>
                        <div className="form-groups mt-1">
                            <input type="checkbox" name="prices" checked={isChecked["100_200"]} onChange={handleChangePrice} value="100_200" id="price2" className=" checkbox-format mr-2" />
                            <label htmlFor="price2" className=""> $100.00 - $200.00 </label>
                        </div>
                        <div className="form-groups mt-1">
                            <input type="checkbox" name="prices" checked={isChecked["200_400"]} onChange={handleChangePrice} value="200_400" id="price3" className=" checkbox-format mr-2" />
                            <label htmlFor="price3" className=""> $200.00 - $400.00 </label>
                        </div>
                        <div className="form-groups mt-1">
                            <input type="checkbox" name="prices" checked={isChecked.gte_400} onChange={handleChangePrice} value="gte_400" id="price4" className=" checkbox-format mr-2" />
                            <label htmlFor="price4" className=""> {t('users:users.above')} $400.00 </label>
                        </div>
                    </form>
                </div>
            </div>
            <div className="filters__brand brands mt-3">
                <span onClick={handleClickBrand} className="brands__title filters-title d-block">
                    {
                        isCLickBrand ? <i className="fa fa-angle-right mr-2"></i> : <i className="fa fa-angle-down mr-2"></i>
                    }
                    {t('trans:products.tbBrand')}
                </span>
                <div className={isCLickBrand ? "brands__view view--hidden" : "brands__view "}>
                    <form action="" className="mt-3" >
                        {
                            brands && brands.map(item => (
                                <div className="form-groups mt-1" key={item.id}>
                                    <input type="checkbox" name="brandId" onChange={handleChangeBrandAndType} value={item.id} className=" checkbox-format mr-2" />
                                    <label className="">{item.name} </label>
                                </div>
                            ))
                        }
                    </form>
                </div>
            </div>

            <div className="filters__product-type types mt-3">
                <span onClick={handleClickProType} className="types__title filters-title d-block">
                    {
                        isCLickProType ? <i className="fa fa-angle-right mr-2"></i> : <i className="fa fa-angle-down mr-2"></i>
                    }
                    {t('trans:products.labelType')}
                </span>
                <div className={isCLickProType ? "types__view view--hidden" : "types__view "}>
                    <form action="" className="mt-3">
                        {
                            types && types.map(item => (
                                <div className="form-groups mt-1" key={item.id}>
                                    <input type="checkbox" name="typeId" value={item.id} onChange={handleChangeBrandAndType} className=" checkbox-format mr-2" />
                                    <label htmlFor="brand1" className="">{item.name}</label>
                                </div>
                            ))
                        }
                    </form>
                </div>
            </div>

            <div className="feature-img mt-5">
                <a href="">
                    <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/custom-image-1-compressor_1024x1024_crop_center.jpg?v=1570096669" />
                </a>
                <a href="" className="d-block mt-3">
                    <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/custom-image-2-compressor_1024x1024_crop_center.jpg?v=1570096678" alt="" />
                </a>
                <a href="" className="d-block mt-3">
                    <img src="https://adi.admicro.vn/adt/adn/2020/11/300x6-adx5faa549fcd034.png" alt="" />
                </a>
                <a href="" className="d-block mt-3">
                    <img src="https://kenh14cdn.com/thumb_w/660/2020/4/24/sh5-15877200644241131000275.jpg" alt="" />
                </a>
                <a href="" className="d-block mt-3">
                    <img src="https://kenh14cdn.com/thumb_w/660/2020/4/24/sh10-1587721078248527555455.jpg" alt="" />
                </a>
            </div>
        </>
    )
}
