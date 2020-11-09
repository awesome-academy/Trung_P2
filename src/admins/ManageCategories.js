import React, { useState, useEffect, useRef} from 'react'
import {useDispatch } from 'react-redux';
import { CreateCategory, UpdateCategory} from "../actions/ActionCategory";
import { UpdateStateExc, FetchUrl} from "../actions/Common";
import { getCategories, getCategoryById } from "../selectors/AdminSelectors";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {useSelector} from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import * as notifi from "../common/constants/Notifications";
import { handleValueInSubmit } from "../common/logics/CategoryLogic";
import TableCategory from "./TableCategory";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
function Modal(props) {
    const  {t} = useTranslation();
    const closeRef = useRef(null);
    let dispatch = useDispatch();
    let cateById = useSelector(state => getCategoryById(state));
    let status = useSelector(state => state.admin.status_exc);

    const formik = useFormik({
        enableReinitialize : true,
        initialValues : {
            name :  cateById?.name ?? "",
            parent_id :  cateById?.parent_id ?? 'root',
            root : "",
        },
        validationSchema :Yup.object({
            name : Yup.string().required(notifi.ERROR_REQUIRED),
            parent_id : Yup.string().required(notifi.ERROR_REQUIRED)
        }),
        onSubmit : (values , {resetForm})=> {
            let idRoot = props.data.find(item => item.id == values.parent_id );
            let value = handleValueInSubmit(idRoot, values, status, cateById);

            if(value.type === "create"){
                dispatch(CreateCategory(value.values));
            } 
            else if(value.type === "update" && value.id) {
                dispatch(UpdateCategory(value.id, value.value));
            }
            closeRef.current.click();
            resetForm();
        }
    });

    return (
        <div className="modal fade" data-keyboard="false" data-backdrop="static" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{t('trans:categories.btnCrCate')}</h5>
                        <button type="button"  onClick={ () => dispatch(UpdateStateExc(""))} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form noValidate autoComplete="off" className="row" onSubmit={ formik.handleSubmit } >
                            <div className="col-6">
                                <TextField id="outlined-basic" value={formik.values.name} onChange={ formik.handleChange } name="name" label="Categories" variant="outlined" />
                                <span className="error-message"> { formik.touched.name && formik.errors.name }</span>
                            </div>
                            <div className="col-6" >
                                <InputLabel id="demo-controlled-open-select-label" >{t('trans:categories.lbParCate')}</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    onChange={ formik.handleChange }
                                    native
                                    value   = { formik.values.parent_id }
                                    name    = "parent_id"
                                >
                                    <option value="root">Root</option>
                                    {
                                        props.data && props.data.map((item) => <option  key={item.id} value={item.id}>{item.name}</option> )
                                    }
                                </Select> 
                                <span className="error-message">{ formik.touched.parent_id && formik.errors.parent_id }</span>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={closeRef} onClick={ () => dispatch(UpdateStateExc(""))} className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" onClick={formik.handleSubmit} className="btn btn-primary">{ status === "create" ? t('trans:categories.btnCrCate') : t('trans:categories.btnUpCate') }</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default function ManageCategories() {
    let { t, i18n } = useTranslation(['common', 'trans']);
    // let { t } = useTranslation(['trans', 'common']);
    const dataTitle = [
        t('trans:categories.cate'),
        t('trans:categories.rootCate'),
        t('trans:categories.act')
        ];
    let dispatch = useDispatch();
    let categories = useSelector(state => getCategories(state));
    let allCate = useSelector(state => state.users.allCate);

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(UpdateStateExc("create"));
    }

    useEffect(() => {
        let url = "categories"
        dispatch(FetchUrl(url, "FETCH_ALL_CATE"));
    }, [])

    return (
        <div className="category">
            <div className="row mt-5">
                <div className="col-4">
                    <span className="category__title">
                        { t('trans:categories.listCate')}
                   </span>
                </div>
                <div className="col-2 text-right">
                    <button type="button" id="category" onClick={handleClick}  className="category__icon--format" data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-plus"></i>
                        { t('trans:categories.btnCrCate')}
                     </button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6 ">
                    <TableCategory title={dataTitle} allCate={ allCate } data={ categories.length > 0 ? categories :[] } />
                    <Modal data={ allCate.length > 0 && allCate } />
                </div>
                <div className="col-6">
                </div>
            </div>
        </div>
    )
}
