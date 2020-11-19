import React from 'react';
import { useState, useEffect } from 'react';
import {Link, Switch, useLocation} from "react-router-dom";
import PrivateRouter from '../common/PrivateRouter';
import FormCustomerAccount from './FormCustomerAccount';
import OrderHistory from './OrderHistory';

export default function Account() {
    const {pathname} = useLocation();
    const [status, setStatus] = useState();

    useEffect(() => {
        let checkOrder = pathname.includes("/customer/orders");
        let checkAcc = pathname.includes("/customer/account");
        checkOrder && setStatus("orders");
        checkAcc && setStatus("account");
    }, [pathname]);


    return (
        <div className="customers ">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div className="wrapper">
                            <p className="customers__title ">My Account</p>
                            <div className= {status ===  "account" ? "customers__option customers__option--active" : "customers__option" }>
                                <Link to="/customer/account">
                                    <i className="fa fa-user mr-3" aria-hidden="true"></i>
                                    Thông tin tài khoản
                                </Link>
                            </div>
                            <div className= {status ===  "orders" ? "customers__option customers__option--active" : "customers__option" }>
                                <Link to="/customer/orders">
                                    <i className="fa fa-bell mr-3" aria-hidden="true"></i>
                                    Quản lý đơn hàng
                                </Link>
                            </div>
                            <div className= "customers__option">
                                <Link to="/colections">
                                    <i className="fa fa-home mr-3" aria-hidden="true"></i>
                                    Trang Chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <Switch>
                            <PrivateRouter path="/customer/account">
                                <FormCustomerAccount />
                            </PrivateRouter>
                            <PrivateRouter path="/customer/orders">
                                <OrderHistory />
                            </PrivateRouter>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}
