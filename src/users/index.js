import React, { useEffect, useState} from 'react';
import { Route , useLocation, useRouteMatch, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useDispatch } from "react-redux";
import { FetchUrl, UpdateDataWithType } from "../actions/Common";
import {GetValCartHover} from "../actions/UsersAction"
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import UserFilters from "./UserFilters";
import ShowListProduct from "./ShowListProduct";
import DetailProduct  from "./DetailProduct";
import SlickProducts from "./SlickProducts";
import { CalcNumberCart } from "../common/logics/UsersLogic";
import { GetIdCateWithURL, GetBreadCrumb, GetHotProducts} from "../selectors/UserSelectors";
import Cart from './Cart';
import {useTranslation} from "react-i18next";
import "../translations/i18n";
import _,{debounce} from 'lodash';
import ColectionsPage from "./ColectionsPage";

export default function HomePage(props) {
    const {t} = useTranslation(['users']);
    const [nameCate, setNameCate] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const getIdCate = useSelector(state => GetIdCateWithURL(nameCate)(state));
    // const abc = useSelector(state => GetBreadCrumb(getIdCate)(state));
    let dataRecent = useSelector(state => state.users.recentlyPros);
    let dataHot = useSelector(state => GetHotProducts(state));

    const { path, url } = useRouteMatch();
    useEffect(() => {

        if(getIdCate){
            let urlBrand = `brands-product/${getIdCate}`;
            dispatch(FetchUrl(urlBrand, 'FETCH_BRAND_CATE_ID'));

            let urlTypes = `types-product/${getIdCate}`;
            dispatch(FetchUrl(urlTypes, 'FETCH_TYPE_CATE_ID'));

            let urlCateChild = `categories?parent_id=${getIdCate}`;
            dispatch(FetchUrl(urlCateChild, 'FETCH_CATE_CATE_ID'));
        }

    }, [getIdCate]);
    let pathName = location?.pathname.replace("/colections/", "").replaceAll("-", " ");
    // let pathName = location?.pathname.replace("/colections/", "").replace(/"-"/g, " ");
    useEffect(() => {
        if(pathName){
            setNameCate(pathName);
        } 
    }, [pathName])

    let cart = localStorage.getItem('cart');
    
    const CartHover = () => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
        if(cart) {
            let search = cart.reduce((result, item) =>  result += `&id=${item.id}`, "");
            search ? dispatch(GetValCartHover( 'products?_expand=categorie' + search, cart)) 
                    : dispatch(UpdateDataWithType([], 'FETCH_PRODUCT_HOVER_CART'));
        }
    }
    
    useEffect(() => {

        CartHover();

    }, [cart])

    useEffect(() => {
        let url = "categories";
        dispatch(FetchUrl(url, "FETCH_ALL_CATE"));

        let idPros = localStorage.getItem('recently');
        if(idPros){
            let urlRecentlyProduct = JSON.parse(idPros)?.reduce((result, item) =>  result += `&id=${item}`, "").replace('&', '?');
            dispatch(FetchUrl( 'products/' + urlRecentlyProduct, "FETCH_PRODUCT_RECENTLY"));
        }

        let numberOfCart = CalcNumberCart();
        dispatch(UpdateDataWithType(numberOfCart,'GET_NUMBER_OF_CART'));

        CartHover();

        function toggleBgkMenu(){
            let heigth = window.pageYOffset;
            if(heigth < 90){
                document.getElementById("logo")?.classList.add("d-none")
                document.getElementById("cart")?.classList.add("d-none")
            }else{
                document.getElementById("logo")?.classList.remove("d-none")
                document.getElementById("cart")?.classList.remove("d-none")
            }
        }
        
        window.addEventListener('scroll', _.debounce(toggleBgkMenu, 300));
        document.getElementById("logo")?.classList.add("d-none");
        document.getElementById("cart")?.classList.add("d-none");
        return () => {
            window.addEventListener('scroll', toggleBgkMenu);
            window.addEventListener('scroll', _.debounce(toggleBgkMenu, 300));
            document.getElementById("logo")?.classList.add("d-none");
            document.getElementById("cart")?.classList.add("d-none");
        }

    }, []);

    return (
        <div className="homepage">
            <header>
                <div className="top">
                    <HeaderTop />
                </div>
            </header>
            <HeaderBottom />
            <main>
                <div className="container">
                    <div className="bread-crumb row px-3 my-4">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" to="/colections" >
                                Home
                            </Link>
                            
                            <Typography color="textPrimary">Colections</Typography>
                        </Breadcrumbs>
                    </div>

                    <Switch>
                        <Route  path={ path + "/cart" } component={Cart} />
                        <Route exact path="/colections/" component={ColectionsPage} />
                        <Route  path="/colections/:id">
                            <div className="row main mt-3">
                                <div className="filters col-2">
                                    <UserFilters />
                                </div>
                                <div className="contents col-10">

                                    <Route exact path="/colections/:id" >
                                        <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/category-banner-compressor.jpg?v=1570188595" className="contents__img" alt=""/>
                                        <div className="row contents__info my-4">
                                            <p className="contents__title">{ pathName }</p>
                                            <p className="contents__des">
                                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque non nulla nulla, nec tincidunt risus morbi ultricies est ditae odio ultrices imperdiet. Cras accumsan dorci maces consequat blandi susto dusto elementum libero non honcus purus sem sit amet enimos.
                                            </p>
                                        </div>
                                        <ShowListProduct nameCate={nameCate} />
                                    </Route>

                                    <Route exact path={ path + "/:id/product/:id" } >
                                        <DetailProduct /> 
                                    </Route>
                                </div>
                            </div>

                            {
                                dataRecent.length > 0 && (
                                    <div className="recently">
                                        <div className="recently-view-products container">
                                            <SlickProducts title={t('users:users.recentlyPro')} data={ dataRecent } />
                                        </div>
                                    </div>
                                )
                            }
                            {
                                dataHot.length > 0 && (
                                    <div className="hot-products">
                                        <div className="recently-view-products container">
                                            <SlickProducts title={t('users:users.hotPro')} data={ dataHot } />
                                        </div>
                                    </div>
                                )
                            }

                        </Route>
                    </Switch>
                </div>
                
            </main>
        </div>
    )
}
