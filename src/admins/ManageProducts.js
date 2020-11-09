import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import TableProducts from './TableProducts';
import Modal from "./FormCustom";
import { FetchProductsPageAdmin, CreateProduct, UpdateProduct, UpdateStatusShowDetailProduct} from "../actions/ProductsAction";
import { UpdateStateExc } from "../actions/Common";
import { getListStatusProduct, getListTypes, getListBrands , getCategories, getStatusExecute, getCategoryById} from "../selectors/AdminSelectors";
import { getMonthName } from "../common/logics/CommonLogic";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Chart from './Chart';
import { data, legend} from "../common/constants/ChartConfig"; 
import { useTranslation } from "react-i18next";
import "../translations/i18n";

let formik;
function FormProducts(props){
    let { t } = useTranslation(['common', 'trans'])
    const dispatch = useDispatch();
    let status = useSelector(state => getStatusExecute(state));
    let cateById = useSelector(state => getCategoryById(state));

    formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: cateById?.name ?? "",
            img : cateById?.img ?? "",
            price : cateById?.price ?? "",
            statusId : cateById?.statusId ?? "",
            typeId : cateById?.typeId ?? "",
            categorieId : cateById?.categorieId ?? "",
            brandId : cateById?.brandId ?? ""

        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            price: Yup.number().min(0).required(),
            typeId: Yup.string().required(),
            categorieId : Yup.string().required(),
            brandId : Yup.string().required(),
            img : Yup.string().required()
        }),
        onSubmit: (values, { resetForm }) => {
            if(status === "create") {
                dispatch(CreateProduct(values));
            }
            if(status === "update"){
                let id = cateById.id;
                dispatch(UpdateProduct(id, values));
            }
            document.getElementById("close-modal").click();
            resetForm();
        }
    });
    const handleChange = (event) => {
        event.preventDefault();
        let files = event.target.files;
        formik.handleChange(event);

    	let reader = new FileReader();
    	reader.readAsDataURL(files[0]);
    	reader.onload = (e) => {
            let value = e.target.result;
            formik.setFieldValue('img',  value);
    	}
    }

    return (
        <form noValidate autoComplete="off" className="row" onSubmit={formik.handleSubmit} >
            <div className="col-6 mt-3">
                <TextField id="outlined-basic" value={formik.values.name} onChange={ formik.handleChange }  name="name" label= {t('trans:products.labelProduct')} variant="outlined" />
                <span className="error-message"> {formik.touched.name && formik.errors.name}</span>
            </div>
            <div className="col-6 mt-3">
                <TextField id="outlined-basic" value={formik.values.price} onChange={formik.handleChange}  type="number" name="price" label={t('trans:products.labelPrice')} variant="outlined" />
                <span className="error-message"> {formik.touched.price && formik.errors.price}</span>
            </div>
            <div className="col-6 mt-4" >
                <InputLabel id="demo-controlled-open-select-label"> {t('trans:products.labelType')} </InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    native
                    value={formik.values.typeId}
                    onChange={ formik.handleChange }
                    name="typeId"
                >
                    <option value="">none</option>
                    {
                        props.types && props.types.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
                    }
                </Select>
                <span className="error-message">{formik.touched.typeId && formik.errors.typeId}</span>
            </div>
            <div className="col-6 mt-4" >
                <InputLabel id="demo-controlled-open-select-label"> {t('trans:products.labelStatusPro')} </InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    native
                    name="statusId"
                    value={formik.values.statusId}
                    onChange={ formik.handleChange }
                >
                    <option value="">none</option>
                    {
                        props.status && props.status.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
                    }
                </Select>
                <span className="error-message">{formik.touched.statusId && formik.errors.statusId}</span>
            </div>
            <div className="col-6 mt-4" >
                <InputLabel id="demo-controlled-open-select-label"> {t('trans:products.labelBrand')} </InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    
                    native
                    value={formik.values.brandId}
                    onChange={ formik.handleChange }
                    name="brandId"
                >
                    <option value="">none</option>
                    {
                        props.brands && props.brands.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
                    }
                </Select>
                <span className="error-message">{formik.touched.brandId && formik.errors.brandId}</span>
            </div>
            <div className="col-6 mt-4" >
                <InputLabel id="demo-controlled-open-select-label"> {t('trans:products.labelCategory')}  </InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    
                    native
                    value={formik.values.categorieId}
                    onChange={ formik.handleChange }
                    name="categorieId"
                >
                    <option value="">none</option>
                    {
                        props.categories && props.categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
                    }
                </Select>
                <span className="error-message">{formik.touched.categorieId && formik.errors.categorieId}</span>
            </div>
            <div className="col-12 text-center mt-5" >
                <label htmlFor="upImg" className="custom-button-upload-img">
                    <i className="fas fa-upload"></i>
                    {t('trans:products.labelUpImg')}
                </label>
                    <input  onChange={ handleChange } name="img" id="upImg" accept="image/*" type="file" />
                {formik.values.img && (<img src={formik.values.img} className="product__img-upload" alt={formik.values.product} />) }
                <span className="error-message">{formik.touched.img && formik.errors.img}</span>
            </div>
        </form>
    )
}


export default function ManageProducts() {
    const dispatch = useDispatch();
    let { t } = useTranslation(['trans', 'common']);

    let dataTitle = [
        t('trans:products.tbProduct'), 
        t('trans:products.tbImg'), 
        t('trans:products.tbPrice'), 
        t('trans:products.tbStatus'), 
        t('trans:products.tbType'),
        t('trans:products.tbCate'), 
        t('trans:products.tbBrand'),
        t('trans:products.tbActions'), 
    ];
    let status_product = useSelector(state => getListStatusProduct(state));
    let types = useSelector(state => getListTypes(state));
    let brands = useSelector(state => getListBrands(state));
    let categories = useSelector(state => getCategories(state));
    let status = useSelector(state => getStatusExecute(state));
    let title = status === "create" ? t('trans:products.btnCrPro') : t('trans:products.btnUpPro');
    let isShowProduct = useSelector(state => state.admin.isShowDetailPro);
    
    useEffect(() => {
        dispatch(FetchProductsPageAdmin());
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(UpdateStateExc("create"));
    }

    return (
        <div className="product">
            <div className="row mt-5">
                <div className={isShowProduct ? "col-7" : "col-10"}>
                    <span className="category__title">
                    { t('trans:products.listPro') }
                   </span>
                </div>
                <div className="col-2 text-right">
                    <button type="button" id="product" onClick={handleClick} className="category__icon--format" data-toggle="modal" data-target="#modalProduct">
                        <i className="fas fa-plus"></i>
                        { t('trans:products.btnAddPro') }
                     </button>
                </div>
            </div>
            <div className="row mt-3">
                <div className={isShowProduct ? "col-9" : "col-12"}>
                    <TableProducts title={dataTitle} />
                    <Modal  title={title}  children = { <FormProducts  types={types} status={status_product} brands={brands} categories={categories } /> } formik={ formik }/>
                </div>
                {
                    isShowProduct && <div className="col-3">
                        <ShowDetailProduct />
                    </div>
                }
            </div>
        </div>
    )
}

function ShowDetailProduct(){
    let { t , i18}  = useTranslation(["trans", "common"]);
    const[currentMonth, setCurrentMonth] = useState({});
    const dispatch = useDispatch();
    let product = useSelector(state => state.admin.show_detail_product.productById);
    let comments = useSelector(state => state.admin.show_detail_product.numberCommentProductID);
    let rates = useSelector(state => state.admin.show_detail_product.avg_rate_product);
    
    let dataChart = useSelector(state => state.admin.show_detail_product.data_chart);
    let dataChartFormat = new Map(dataChart);
    let data_chart_format = {...data};

    let values =  getMonthName(5, dataChartFormat);
    data_chart_format.labels = values.month;
    data_chart_format.datasets[0].data = values.values;
    data_chart_format.datasets[0].label = t('trans:products.tbProduct');
    let valOptions = dataChartFormat.values();
    let max = (Math.max(...valOptions) + 10);
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: Math.min(...valOptions),
                        suggestedMax: max,
                    }
                }
            ]
        }
    };

    const handleCloseDetailProduct = event => {
        event.preventDefault();
        dispatch(UpdateStatusShowDetailProduct(false));
    }

    useEffect(()=>{
        let now = new Date();
        const month = now.getMonth();
        now.setMonth(now.getMonth() - 1);
        const monthName = now.toLocaleString('default', { month: 'short' });
        setCurrentMonth({monthName, month });

        return () => {
            dispatch(UpdateStatusShowDetailProduct(false));
        }
    },[])

    return (
        <div className="detail-product position-relative">
            <button type="button" onClick={handleCloseDetailProduct}  className="close-detail-product position-absolute">
                <i className="fas fa-times" ></i>
            </button>
            <div className="detail-product__info mb-3 text-center">
                {
                    product && (
                        <React.Fragment>
                            <img src={product.img}  className="detail-product__img" alt=""/>
                            <span className="detail-product__name d-block">{ product.name }</span>
                        </React.Fragment>
                    )
                }
                <p className="detail-product__comment t">
                    {t('trans:products.lbComments')} : <span className="detail-product__comment-format">{ comments } &nbsp; <i className="fas fa-comment"></i></span>
                </p>
                <p className="detail-product__rate ">
                    {t('trans:products.lbRates')} : <span className="detail-product__rate-format">{ rates } &nbsp; <i className="fas fa-star" ></i></span> 
                </p>
                <p className="detail-product__sale ">
                    {t('trans:products.lbSales')} / { currentMonth.monthName } : <span className="detail-product__sale-format"> { dataChartFormat.get(`${currentMonth.month}`) ?? 0 } &nbsp; <i className="fas fa-boxes"></i></span>
                </p>
            </div>
            <div className="detail-product__chart w-100">
                <Chart data={data_chart_format} legend={legend} title={t('trans:products.lbTotalSales')} options={options} />
            </div>
        </div>
    );
}