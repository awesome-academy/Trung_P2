import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux";
import { GetCateParent } from "../selectors/UserSelectors";
import SlickProducts from './SlickProducts';
import { getChildCateClick} from "../common/logics/UsersLogic";
import { GetIdCateWithURL } from "../selectors/UserSelectors";
import FetchData from '../common/Api';
import {useTranslation} from "react-i18next";
import "../translations/i18n";

export default function ColectionsPage() {
    const [cate, setCate] = useState("MakeUp");
    const [data, setData] = useState([]);
    let rootCate = useSelector(state => GetCateParent(state)) || [];
    let getIdCate = useSelector(state => GetIdCateWithURL(cate.replaceAll(" ", '-'))(state));
    const getCategories = useSelector(state => state.users.allCate);
    const {t} = useTranslation(['users']);
    useEffect(() => {
        let getChildId = getChildCateClick(getCategories, getIdCate);
        let value = getChildId.reduce((result, item) => {
            return result += `&categorieId=${item}`;
        }, '');
        let url = `products?_expand=categorie${value}&_page=1&_limit=5`;
        FetchData(url)().then(res => {
           if(res.status >= 200 && res.status < 300){
               setData(res.data);
           }
        })
    }, [getCategories, getIdCate]);

    const handleClickCate = event => {
        event.preventDefault();
        let value = event.target.getAttribute("data");
        setCate(value);
    }

    return (
        <section className="colections">
            <div className="container">
                <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/home-slide-1.jpg?v=1568707809" alt="" className="sliders_img w-100" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-4 three-blocks position-relative">
                        <a href="http://localhost:5000/colections/MakeUp" className="block__img">
                            <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/banner-top-1-compressor_1200x_crop_center.jpg?v=1568964367" alt="makeup" />
                        </a>
                        <a href="http://localhost:5000/colections/MakeUp" className="block__title">
                            Make Up
                        </a>
                    </div>
                    <div className="col-4 three-blocks position-relative">
                        <a href="" className="block__img">
                            <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/banner-top-2-compressor_1200x_crop_center.jpg?v=1568964382" alt="makeup" />
                        </a>
                        <span className="block__title">
                            Nail
                        </span>
                    </div>
                    <div className="col-4 three-blocks position-relative">
                        <a href="" className="block__img">
                            <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/banner-top-3-compressor_1200x_crop_center.jpg?v=1568964390" alt="makeup" />
                        </a>
                        <span className="block__title">
                            Body Art
                        </span>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="new-pros">
                    <p className="new-pros__title text-center">{t('users:users.newPro')}</p>
                    <ul className="new-pros__list text-center">
                        {
                            rootCate && rootCate.map(item => (
                                <li data={item.name} onClick={handleClickCate} className={ (item.name == cate) ? "new-pros__item new-pros__item--active d-inline-block" : "new-pros__item d-inline-block"} key={item.id}>
                                    {item.name}
                                </li>
                            ))
                        }
                    </ul>
                    <div className="new-pros__slick mt-4">
                        {
                            data.length > 0 ? <SlickProducts title={'data'}  data={data}  url={ `/colections/${cate}/product` } /> : <p className="text-center">Không có sản phẩm tương ứng</p>
                        }
                        
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-6 px-2">
                        <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/home-banner-milde-1-compressor_1200x_crop_center.jpg?v=1569234903" className="w-100" alt="product"/>
                    </div>
                    <div className="col-6 px-2">
                        <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/home-banner-milde-2-compressor_1200x_crop_center.jpg?v=1569235070" className="w-100" alt="product"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
