import React, { useEffect, useState } from 'react'
import Chart from './Chart';
import { Line } from "react-chartjs-2";
import {dataSales, dataRate, data, dataProducts, optionsSales, optionsRate, optionsProduct, options, legend} from "../common/constants/ChartConfig"; 
import { useTranslation } from 'react-i18next';
import "../translations/i18n";
import FetchData from '../common/Api';

export default function ChartSales(props) {
    let { t } = useTranslation(['trans', 'common']);

    const [total, setTotal] = useState({
        users : 0,
        orders : 0,
        rating : 0,
        products : 0
    });
 
    useEffect( async () => {
        let urlUser = "users?_limit=1";
        let urlOrder = "orders?_limit=1";
        let urlcomments = "comments?_limit=1";
        let urlPros = "products?_limit=1";
        let result = await Promise.all([
           FetchData(urlUser)(),
           FetchData(urlOrder)(),
           FetchData(urlcomments)(),
           FetchData(urlPros)()
            
        ]).then(res => {
            if(res.length > 0){
                let values = res.reduce((result,item) => {
                    let total = item.headers['x-total-count'];
                    result.push(total);
                    return result;
                }, []);
                return values;
            }
        });

        setTotal({
            users : result[0],
            orders : result[1],
            rating : result[2],
            products : result[3]
        })

    }, []);

    return (
        <div className="App">
            <div className="over-view-result row">
                <div className="block-over-view ">
                    <span className="block-over-view__icon block-over-view__user">
                        <i className="fas fa-users"></i>
                    </span>
                    <span className="block-over-view__number">{ total.users }</span>
                    <span className="name text">User</span>
                    <div className="text">
                        <span className="increased">
                            <i className="fas fa-arrow-up"></i>
                            12%
                        </span>
                        {t('trans:dashboard.increased')}
                    </div>
                </div> 
                <div className="block-over-view ">
                    <span className="block-over-view__icon block-over-view__user2">
                        <i className="fas fa-indent"></i>
                    </span>
                    <span className="block-over-view__number">{ total.orders }</span>
                    <span className="name text">Orders</span>
                    <div className="text">
                        <span className="increased">
                            <i className="fas fa-arrow-up"></i>
                            12%
                        </span>
                        {t('trans:dashboard.increased')}
                    </div>
                </div> 
                <div className="block-over-view ">
                    <span className="block-over-view__icon block-over-view__user3 ">
                        <i className="fas fa-smile"></i>
                    </span>
                    <span className="block-over-view__number">{total.rating }</span>
                    <span className="name text">Rate</span>
                    <div className="text">
                        <span className="descrease">
                            <i className="fas fa-arrow-down"></i>
                            12%
                        </span>
                        {t("trans:dashboard.decrease") }
                    </div>
                </div> 
                <div className="block-over-view ">
                    <span className="block-over-view__icon block-over-view__user4">
                        <i className="fas fa-boxes"></i>
                    </span>
                    <span className="block-over-view__number">{total.products}</span>
                    <span className="name text">Products</span>
                    <div className="text">
                        <span className="increased">
                            <i className="fas fa-arrow-up"></i>
                            12%
                        </span>
                        {t("trans:dashboard.increased") }
                    </div>
                </div> 
            </div>   

            <section className="chart-all">
                <div className="chart-all__top row">
                    <Chart data={data} legend={legend} title="Total Users" options={options} />
                    <Chart data={dataProducts} title="Total Products" legend={legend} options={optionsProduct} />
                    <Chart data={dataRate} title="Total Rate" legend={legend} options={optionsRate} />
                </div>
                <div className="chart-all__bottom ">
                    <div className="chart-all__block">
                        <span className="title-chart">Sales</span>
                        <Line data={dataSales}  legend={legend} options={optionsSales} />
                    </div>
                </div>
            </section>
           
        </div>
    )
}
