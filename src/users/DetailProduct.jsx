import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SaveProductRecenty, RateReviews } from "../common/logics/UsersLogic";
import { FetchUrl, GetCountUrl } from "../actions/Common";
import TabPanel from "./TabPanel";
import { FacebookShareButton, PinterestShareButton, FacebookMessengerShareButton, TwitterShareButton, FacebookIcon, FacebookMessengerIcon, PinterestIcon, TwitterIcon } from "react-share";
import { AddToCart, CalcNumberCart } from "../common/logics/UsersLogic";
import { UpdateDataWithType } from "../actions/Common";
import {useTranslation} from "react-i18next";
import "../translations/i18n";
export default function DetailProduct() {
    const {t} = useTranslation(['trans','users']);
    const [quantity, setQuantity] = useState(1);
    let params = useParams();
    const dispatch = useDispatch();
    let product = useSelector(state => state.users.proDetail.product);
    let nComment = useSelector(state => state.users.proDetail.nComment);
    let nRate = useSelector(state => state.users.proDetail.nRate);
    let { id } = params;


    const loadProductIdChange = () => {
        SaveProductRecenty(parseInt(id));

        let idPros = localStorage.getItem('recently');
        if (idPros) {
            let urlRecentlyProduct = JSON.parse(idPros)?.reduce((result, item) => result += `&id=${item}`, "").replace('&', '?');
            dispatch(FetchUrl('products/' + urlRecentlyProduct, "FETCH_PRODUCT_RECENTLY"));
        }

        // fetch product by id
        let urlProId = `products?id=${id}&_expand=brand&_expand=type`;
        dispatch(FetchUrl(urlProId, 'USER_GET_PRODUCT_BY_ID'));

        // //fetch avg rate by product id
        let urlAvgProId = `get-avg-rate-product/${id}`;
        dispatch(FetchUrl(urlAvgProId, "USER_COUNT_RATE_BY_ID"));

        // //fetch count comments by product id
        let urlCountCommentProId = `products/${id}/comments?_limit=1`;
        dispatch(GetCountUrl(urlCountCommentProId, "USER_COUNT_COMMENT_BY_ID"));


        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        loadProductIdChange();
    }, [id]);



    useEffect(() => {
        loadProductIdChange();
    }, []);

    const handleChangeQuantity = event => {
        event.preventDefault();
        let value = event.target.value;
        setQuantity(parseInt(value))
    }

    const handleClickAddToCart = event => {
        event.preventDefault();
        let idPro = product[0]?.id;

        if (idPro) {
            AddToCart(idPro, quantity);
            let numberOfCart = CalcNumberCart();
            dispatch(UpdateDataWithType(numberOfCart, 'GET_NUMBER_OF_CART'));
        }
    }

    return (
        <section className="product-detail">
            <div className="row">
                <div className="col-6">
                    <div className="product-detail__warpper-img text-center" >
                        <img src={product && product[0]?.img} className="product-detail__img" alt={product && product[0]?.name} />

                    </div>
                </div>
                <div className="col-6">
                    <div className="product-detail__info">
                        <h2>
                            <a href="" className="product-detail__name">
                                {
                                    product && product[0]?.name
                                }
                            </a>
                        </h2>
                        <div className="product-detail__rate">
                            {nRate ? RateReviews(nRate) : RateReviews(0)}
                            <span className="number-reivew">{nComment} {t('users:Detail.review')}</span>
                        </div>
                        <div className="mb-1">
                            <span className="product-detail__title">{t('trans:products.labelBrand')}</span>
                            <span className="product-detail__title-val">
                                {
                                    product && product[0]?.brand?.name
                                }
                            </span>
                        </div>
                        <div className="mb-1">
                            <span className="product-detail__title">{t('trans:products.labelType')}</span>
                            <span className="product-detail__title-val">
                                {
                                    product && product[0]?.type?.name
                                }
                            </span>
                        </div>
                        <p className="product-detail__des">Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut risus. Sedcus faucibus an sullamcorper mattis drostique des...
                        </p>
                        <div className="product-detail__price">
                            <span className="format-price">$50</span>
                            <span className="product-detail__price-current">${
                                product && product[0]?.price
                            }</span>
                        </div>
                        <form action="">
                            <label className="product-detail__title" >{t('trans:orders.lbQuantity')} </label>
                            <input type="number" onChange={handleChangeQuantity} value={quantity} className="product-detail__inp" min={1} required />
                        </form>
                        <div className="mb-1 mt-4">
                            <span className="product-detail__title ">{t('users:Detail.subtotal')}</span>
                            <span className="product-detail__title--bold">$
                                {
                                    (product.length > 0 && quantity) ? (product[0]?.price * parseInt(quantity)) : 0
                                }
                            </span>
                        </div>
                        <button type="button" onClick={handleClickAddToCart} className="btn-add-cart btn-add-to-cart">
                            {t('users:Detail.addToCart')}
                        </button>
                        <div className="row btn-react-share">
                            <FacebookShareButton url="https://tiki.vn/bo-2-binh-xit-khu-mui-va-duoi-muoi-hieu-qua-huong-sa-chanh-julyhouse-50ml-p7642925.html?spid=7642926&src=home-deal-hot" className="share">
                                <FacebookIcon size={24} round={true} />
                            </FacebookShareButton>
                            <FacebookMessengerShareButton url="https://tiki.vn/bo-2-binh-xit-khu-mui-va-duoi-muoi-hieu-qua-huong-sa-chanh-julyhouse-50ml-p7642925.html?spid=7642926&src=home-deal-hot" className="share">
                                <FacebookMessengerIcon size={24} round={true} />
                            </FacebookMessengerShareButton>
                            <PinterestShareButton url="https://tiki.vn/bo-2-binh-xit-khu-mui-va-duoi-muoi-hieu-qua-huong-sa-chanh-julyhouse-50ml-p7642925.html?spid=7642926&src=home-deal-hot" className="share">
                                <PinterestIcon size={24} round={true} />
                            </PinterestShareButton>
                            <TwitterShareButton url="https://tiki.vn/bo-2-binh-xit-khu-mui-va-duoi-muoi-hieu-qua-huong-sa-chanh-julyhouse-50ml-p7642925.html?spid=7642926&src=home-deal-hot" className="share">
                                <TwitterIcon size={24} round={true} />
                            </TwitterShareButton>
                        </div>
                        <div className="row mt-3">
                            <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/trust_800x-compressor_800x_71db01ac-43db-4058-b51a-3d02ee6a782b_800x.png?v=1570592547" className="w-100" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <TabPanel />
            </div>
        </section>
    )
}
