import React from 'react'
import Chart from './Chart';
import { Line } from "react-chartjs-2";
import {dataSales, dataRate, data, dataProducts, optionsSales, optionsRate, optionsProduct, options, legend} from "../common/constants/ChartConfig"; 
import { useTranslation } from 'react-i18next';
import "../translations/i18n";

export default function ChartSales(props) {
    let { t } = useTranslation(['trans', 'common']);

    return (
        <div className="App">
            <div className="over-view-result row">
                <div className="block-over-view ">
                    <span className="block-over-view__icon block-over-view__user">
                        <i className="fas fa-users"></i>
                    </span>
                    <span className="block-over-view__number">71.5 K</span>
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
                    <span className="block-over-view__number">905 K</span>
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
                    <span className="block-over-view__number">5 K</span>
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
                    <span className="block-over-view__number">71.5 K</span>
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
