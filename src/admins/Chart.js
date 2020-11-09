import React from 'react'
import { Line } from "react-chartjs-2";
export default function Chart(props) {
    return (
        <div className="chart-all__block ">
            <span className="title-chart">{props.title}</span>
            <Line data={ props.data} legend={ props.legend} height = {  250 } options={props.options}/>
        </div>
    );
}
