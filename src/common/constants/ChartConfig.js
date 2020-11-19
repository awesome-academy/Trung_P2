const data = {
    labels: [ "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [ 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192, .2)",
        borderColor: "rgba(75,192,192,1)",
      }
    ]
};
export const legend = {
    display: false,
};
const options = {
  
    scales: {
        yAxes: [
        {
            ticks: {
            suggestedMin: 30,
            suggestedMax: 100,
            }
        }
        ]
    }
};
const value = JSON.stringify(options);
const optionsProduct = JSON.parse(value);

const valueData = JSON.stringify(data);
const dataProducts = JSON.parse(valueData);
dataProducts.datasets[0].label = "Products";
dataProducts.datasets[0].backgroundColor = "rgba(51, 70, 211, .2)";
dataProducts.datasets[0].borderColor = "rgba(51, 70, 211, 1)";

const valueRate = JSON.stringify(options);
const optionsRate = JSON.parse(valueRate);

const valDataRate = JSON.stringify(data);
const dataRate = JSON.parse(valDataRate);
dataRate.datasets[0].label = "Products";
dataRate.datasets[0].backgroundColor = "rgba(249, 156, 78, .2)";
dataRate.datasets[0].borderColor = "rgba(249, 156, 78, 1)";


const valueSales = JSON.stringify(options);
const optionsSales = JSON.parse(valueSales);
optionsSales.scales.yAxes[0].ticks.suggestedMin = 10;

const valSales = JSON.stringify(data);
const dataSales = JSON.parse(valSales);
dataSales.datasets[0].label = "Sales";
dataSales.datasets[0].backgroundColor = "rgba(229, 62, 252, .2)";
dataSales.datasets[0].borderColor = "rgba(229, 62, 252, 1)";



const valDetailProduct = JSON.stringify(data);
const datavalDetailProduct = JSON.parse(valDetailProduct);
datavalDetailProduct.datasets[0].label = "Total Sales";
datavalDetailProduct.datasets[0].backgroundColor = "rgba(75,192,192, .2)";
datavalDetailProduct.datasets[0].borderColor = "rgba(75,192,192,1)";

export { datavalDetailProduct,dataSales, dataRate, data, dataProducts, optionsSales, optionsRate, optionsProduct, options }