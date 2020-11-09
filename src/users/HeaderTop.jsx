import React, { useState } from 'react';
import Login from "../common/Login";
import i18next from "i18next";
import "../translations/i18n";
import { useTranslation } from 'react-i18next';
export default function HeaderTop() {
    let lng = localStorage.getItem("lng");
    let {t} = useTranslation();

    const handleShowFormLogin = (event) => {
        event.preventDefault();
        document.getElementById("formLogin").classList.toggle("form-login--active");
    }

    const handleChangeLanguage = (event) => {
        event.preventDefault();
        let data = event.currentTarget.getAttribute("data-id");
        localStorage.setItem('lng', data);
        i18next.changeLanguage(data);
    }
    
    return (
        <div className="header-top container-format row align-items-center">
            <div className="col-4 d-flex">
                <div className="language ">
                    
                    {
                        (lng === "en") ? (
                            <React.Fragment>
                            <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/t/1/assets/i-lang-1.png?v=15307795286853454647" alt="en" className="language__img"/>
                            <span className="language header__text">
                                EN
                            </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAh1BMVEXaJR3//wDZEx7qlxTXAB7ZHR3aIB3//QDzxg7pkBXZGB3YCx7rmxTqlhTbKB320wz1zg3iZBnwtxD99wPhXRn88QXiaRj54gntpxLjcBjkdhf65gjcMxzurBL76wfsohP43AroihXnhBbmfhfvshHgVRrfTRvyvw/dPBv10AzzyA7wthHeSBszN/CXAAAEGElEQVR4nO3d6XaiQBAFYLst2hHc17jFJTFxEt//+UZEkIYGcZmjVN/v98wcqPE22FRJpQIAAAAAAAAAAAAAAAAAAAAAAAAAZ61nH8DroT/07EN4NWondurZB/FiZEM05LMP4sXQWIwRHo2aCyHmCE+cbB5q0kR44mh1qMkK4YlRLeFrITxnsn6sSR3hOTtGR4g2whNRSgQUwhOS61NN1ghPiNqnmiA8EVeE3GcfyqtwN1FNNihKgDpRTToIT8ATZ96zD+Y1uB+xmnwgPD76idXkB+HxkYhDTQ7cqVaTKcLjb05rNcFWdSUZHYTnwJ0kajJBeOg7UZNvfFColqhJzfqaOCORNHKefVBP5iWjcwiP7ff3qeggPE43VRIhunaHx+sZatKzOzzUN9Skb3V4nIGhJEIMbA6P92msyafN4aGhsSZDi8PjbI0lEWLLMDyOLIQWGTVZULF/oESlcybLahF1c3QO4akX+vvLaYmK4ppuOx6vV6ptBRql79kfblSypdh12pdP6i5tVboH7oqa/7UkVSpjX4b3lbWE3m/4VbLchJzUvuKjfFOJLjgJNL18fjf4KOmHJCDn44dXZDwv3eKqU/T24JK8lXJx1dHAtEdyq9qg1LkJubJz+VwL+uuW6tY1m6L1g0pSZ5CbkLd7f0BFhntWe00O3f+tsFfimxIzSj4rv9aExeKqk63VHRVZtUp+U2KmqHFzSZaMFlcdbW+7VelvGeYm5Hh/Llcg5cfjtrjqaHO5Bgkbxh+SgJzPrqrIbMdycdWpzCcYJp9sF1cddYsutf2ybUPfjoqutBY1y3qXq3HC6gtOHm0QI581YxraIEY+a8Y0kt3keSypiXvNZr4lYxqFrzo+S64810THkvCkBjHyWTGmceUDUyvGNAzd5Hls6DQ3DGLks2BMw9hNnseCTvMro2NDp7lxEOMoc+llP6bh/ZpPfLilrLamX+7hMQ5iHG5XPafiZNzgcg9PxiDGaRuazJsIzMc0jIMYs6jxyLyBzXxMwzSIsYhtQxs3sHmPaRgGMWpd/Yypm75YcxzTiHipT0E71XjkuqkO7AXn8KSi0zQ8vlFUtyg8ap8414zGI2+fqN2e74MvqfeFZndDJzuw3/g+HyWtq22alwi9A/udbXi06IwvNB7JVrwDm2145PJ8kpcbjxTF/zjX8FB0k1qs8SjW1jRjGh61C8+wI4ttPLte1IHN9IUAMmzxWxf/T486sJm+EICCRfN9d81dadiBzfOFAMef9Rfi98rGI0XBV2mWLwSQVf/Ubmg8CuZyqxzD4/82+eqm+VepVjxfCOD/rH/jxoY9RVWWLwSQjf4d86/01Wd45XGrd/0KhSOrDB+m33tKDEsCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAzD+q9i3I9cDwkgAAAABJRU5ErkJggg==" alt="en" 
                            style={{ width : '20px', height : '20px', objectFit: "cover" }}
                            className="language__img"/>
                            <span className="language header__text">
                                VN
                            </span>
                            </React.Fragment>
                        )
                    }
                    <a href="">
                        <i className="fas fa-angle-down"></i>
                    </a>
                    <ul className="sub-language">
                        {
                            (lng == "en") ? (
                                <li onClick={handleChangeLanguage} data-id="vn" className="d-block mt-1">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAh1BMVEXaJR3//wDZEx7qlxTXAB7ZHR3aIB3//QDzxg7pkBXZGB3YCx7rmxTqlhTbKB320wz1zg3iZBnwtxD99wPhXRn88QXiaRj54gntpxLjcBjkdhf65gjcMxzurBL76wfsohP43AroihXnhBbmfhfvshHgVRrfTRvyvw/dPBv10AzzyA7wthHeSBszN/CXAAAEGElEQVR4nO3d6XaiQBAFYLst2hHc17jFJTFxEt//+UZEkIYGcZmjVN/v98wcqPE22FRJpQIAAAAAAAAAAAAAAAAAAAAAAAAAZ61nH8DroT/07EN4NWondurZB/FiZEM05LMP4sXQWIwRHo2aCyHmCE+cbB5q0kR44mh1qMkK4YlRLeFrITxnsn6sSR3hOTtGR4g2whNRSgQUwhOS61NN1ghPiNqnmiA8EVeE3GcfyqtwN1FNNihKgDpRTToIT8ATZ96zD+Y1uB+xmnwgPD76idXkB+HxkYhDTQ7cqVaTKcLjb05rNcFWdSUZHYTnwJ0kajJBeOg7UZNvfFColqhJzfqaOCORNHKefVBP5iWjcwiP7ff3qeggPE43VRIhunaHx+sZatKzOzzUN9Skb3V4nIGhJEIMbA6P92msyafN4aGhsSZDi8PjbI0lEWLLMDyOLIQWGTVZULF/oESlcybLahF1c3QO4akX+vvLaYmK4ppuOx6vV6ptBRql79kfblSypdh12pdP6i5tVboH7oqa/7UkVSpjX4b3lbWE3m/4VbLchJzUvuKjfFOJLjgJNL18fjf4KOmHJCDn44dXZDwv3eKqU/T24JK8lXJx1dHAtEdyq9qg1LkJubJz+VwL+uuW6tY1m6L1g0pSZ5CbkLd7f0BFhntWe00O3f+tsFfimxIzSj4rv9aExeKqk63VHRVZtUp+U2KmqHFzSZaMFlcdbW+7VelvGeYm5Hh/Llcg5cfjtrjqaHO5Bgkbxh+SgJzPrqrIbMdycdWpzCcYJp9sF1cddYsutf2ybUPfjoqutBY1y3qXq3HC6gtOHm0QI581YxraIEY+a8Y0kt3keSypiXvNZr4lYxqFrzo+S64810THkvCkBjHyWTGmceUDUyvGNAzd5Hls6DQ3DGLks2BMw9hNnseCTvMro2NDp7lxEOMoc+llP6bh/ZpPfLilrLamX+7hMQ5iHG5XPafiZNzgcg9PxiDGaRuazJsIzMc0jIMYs6jxyLyBzXxMwzSIsYhtQxs3sHmPaRgGMWpd/Yypm75YcxzTiHipT0E71XjkuqkO7AXn8KSi0zQ8vlFUtyg8ap8414zGI2+fqN2e74MvqfeFZndDJzuw3/g+HyWtq22alwi9A/udbXi06IwvNB7JVrwDm2145PJ8kpcbjxTF/zjX8FB0k1qs8SjW1jRjGh61C8+wI4ttPLte1IHN9IUAMmzxWxf/T486sJm+EICCRfN9d81dadiBzfOFAMef9Rfi98rGI0XBV2mWLwSQVf/Ubmg8CuZyqxzD4/82+eqm+VepVjxfCOD/rH/jxoY9RVWWLwSQjf4d86/01Wd45XGrd/0KhSOrDB+m33tKDEsCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAzD+q9i3I9cDwkgAAAABJRU5ErkJggg==" alt="en" 
                                    style={{ width : '20px', height : '20px', objectFit: "cover" }}
                                    className="language__img"/>
                                    <span className="language header__text">
                                        VN
                                    </span>
                                </li>

                            ) : (
                                <li onClick={handleChangeLanguage}  data-id="en" className="d-block mt-1">
                                    <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/t/1/assets/i-lang-1.png?v=15307795286853454647" alt="en"
                                    style={{ width : '20px', height : '20px', objectFit: "cover" }} className="language__img"/>
                                    <span className="language header__text">
                                        EN
                                    </span>
                                </li >
                            )
                        }
                    </ul>
                </div>
                <div className="chg-money mr-3 px-3 border-right">
                    <span className="chg-money header__text">
                        USD
                    </span>
                    <a href="">
                        <i className="fas fa-angle-down"></i>
                    </a>
                </div>
                <div className="find-location">
                    <a href="">
                        <i className="fas fa-map-marker-alt"></i>
                    </a>
                    <span className="find-location header__text">
                        FIND A STORE
                    </span>
                </div>
            </div>
            <div className="col-4 text-center">
                <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/cospora-logo-compressor.png?v=1575949779" alt="logo" className="header-top__img-logo"/>
            </div>
            <div className="col-4 d-flex align-items-center">
                <div className="signin px-3 border-right">
                    <a href="" onClick={handleShowFormLogin}>
                        <span className="signin header__text">
                            SIGN
                        </span>
                        <i className="fas fa-angle-down"></i>
                    </a>

                        <Login />
                        
                </div>
                <div className="love px-3">
                    <i className="far fa-heart"></i>
                </div>
                <div className="cart px-3 position-relative">
                    <i className="fas fa-cart-plus"></i>
                    <span className="total-cart">10</span>
                </div>
                <div className="header-top__search">
                    <form action="" className="form-search">
                        <input type="text" name="search" defaultValue="trung" placeholder="SEARCH" />
                        <button type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
