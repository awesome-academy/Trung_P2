import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FetchUrl, UpdateStateExc} from "../actions/Common";
import { getDayFromat } from "../common/logics/CommonLogic";
import {
    FetchProductsPageAdmin, 
    UpdateCurrentPage, 
    UpdateLimitItem, 
    RemoveProduct, 
    UpdateStatusShowDetailProduct, 
    GetProductById,
    CountCommentProductById,
    CountRateProductId,
    GetListOrderProduct
} from "../actions/ProductsAction";
import { getTotalProductPageAdmin, getCurentPage, getListProductsPageAdmin} from "../selectors/AdminSelectors";
import { useDispatch, useSelector } from 'react-redux';
import { Comfirm } from "../common/Alert";
import PropTypes from "prop-types";
import { TablePagination } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import "../translations/i18n";
TableProducts.propTypes = {
    title : PropTypes.arrayOf(PropTypes.string).isRequired,
    data  : PropTypes.array
}

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    table: {
        minWidth: 650,
    },
  });
  
export default function TableProducts(props) {
    let { t , i18}  = useTranslation(["trans", "common"]);
    const classes = useStyles();
    let dispatch = useDispatch();
    let page = useSelector(state => getCurentPage(state));
    let rowsPerPage = useSelector(state => state.admin.limit_item);
    let value = useSelector(state => getListProductsPageAdmin(state));
    let total = useSelector(state => getTotalProductPageAdmin(state));


    const handRemoveProduct =async (event) => {
        event.preventDefault();
        dispatch(UpdateStatusShowDetailProduct(false));
        if(value.length === 1 && page > 0){
            dispatch(UpdateCurrentPage(page));
        } else if( value?.length === 1 && page === 0){
            dispatch(UpdateCurrentPage(1));
        }
        let id = event.currentTarget.getAttribute("data-id");
        let valQ = t('common:qRem');
        let checkComfirm = await Comfirm(valQ);
        let url = `products/${id}`;
        checkComfirm?.isConfirmed && dispatch(RemoveProduct(url));
    }


    const handUpdateProduct = (event) => {
        event.preventDefault();
        dispatch(UpdateStatusShowDetailProduct(false));
        let id = event.currentTarget.getAttribute("data-id");
        document.getElementById("product").click();
        let url = `products/${id}`;
        dispatch(FetchUrl(url, 'FETCH_CATEGORIES_ID'));
        dispatch(UpdateStateExc("update"));
    }

    
    const handleChangePage = (event, newPage) => {
        event.preventDefault();
        dispatch(UpdateCurrentPage(newPage+1));
        dispatch(FetchProductsPageAdmin());
    };

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        dispatch(UpdateLimitItem(+event.target.value));
        dispatch(FetchProductsPageAdmin());
    };

    const showDetailProduct = async (event) => {
        event.preventDefault();
        let id = event.currentTarget.getAttribute("data-id");
        let productById = value.filter(item => item.id == id);
        dispatch(GetProductById(...productById));
        dispatch(CountCommentProductById(id));
        dispatch(CountRateProductId(id));

        let date = getDayFromat("-5");
        dispatch(GetListOrderProduct(id, date.format, date.curent));

        dispatch(UpdateStatusShowDetailProduct(true));

    }

    useEffect(() => {
        return () => {
            dispatch(UpdateCurrentPage(1));
        }
    }, [])

    return (
        <Paper className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                props.title && props.title.map((item, index) => <TableCell key={index}>{item}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {value && value.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell >
                                    {item.name}
                                </TableCell>
                                <TableCell align="left">
                                    <img src={item.img} className="product__img" alt={ item.name } />
                                </TableCell>
                                <TableCell align="left">{ item.price }</TableCell>
                                <TableCell align="left">{ item.status?.name ?? "" }</TableCell>
                                <TableCell align="left">{ item.type?.name } </TableCell>
                                <TableCell align="left">{ item.categorie?.name }</TableCell>
                                <TableCell align="left">{ item.brand?.name }</TableCell>
                                <TableCell align="left">
                                    <a href="" data-id={ item.id } onClick={ handUpdateProduct } className="table__action">
                                        <i className="fas fa-pen"></i>
                                    </a>
                                    <a href="" data-id={ item.id } onClick={ handRemoveProduct } className="table__action table__action--format-col">
                                        <i className="fas fa-times"></i>
                                    </a>
                                    <a href="" data-id={ item.id } onClick={ showDetailProduct } className="table__action table__action--format-col-eye">
                                        <i className="far fa-eye"></i>
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 25, 100]}
                component="div"
                count={parseInt(total)}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
