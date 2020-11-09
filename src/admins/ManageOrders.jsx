import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    UpdateCurrentPage, 
    UpdateLimitItem, 
} from "../actions/ProductsAction";
import {FetchListOrdersPagAd} from "../actions/OrdersAdmin";
import { getTotalProductPageAdmin, getCurentPage} from "../selectors/AdminSelectors";
import { useDispatch, useSelector } from 'react-redux';
import { TablePagination } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import {Comfirm, Alert} from "../common/Alert";
import FetchData from "../common/Api";

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

export default function ManageOrders() {
    let { t , i18}  = useTranslation(["trans", "common"]);
    let dataTitle = [
        t('trans:orders.lbOrder'), 
        t('trans:products.tbProduct'), 
        t('trans:products.tbImg'), 
        t('trans:products.tbPrice'), 
        t('trans:orders.lbQuantity'), 
        t('trans:orders.lbUser'), 
        t('trans:orders.lbPhone'), 
        t('trans:orders.lbStartDate'), 
        t('trans:products.tbActions'), 
    ];
    const classes = useStyles();
    let dispatch = useDispatch();
    let page = useSelector(state => getCurentPage(state));
    let rowsPerPage = useSelector(state => state.admin.limit_item);
    let value = useSelector(state => state.admin.orders.lists);
    let total = useSelector(state => state.admin.orders.total);

    const handleChangePage = (event, newPage) => {
        event.preventDefault();
        dispatch(UpdateCurrentPage(newPage+1));
        dispatch(FetchListOrdersPagAd());
    };

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        dispatch(UpdateLimitItem(+event.target.value));
        dispatch(FetchListOrdersPagAd());
    };

    const handleCancelOrder = async (event) => {
        event.preventDefault();
        let id = event.currentTarget.getAttribute("data-id");
        let status = event.currentTarget.getAttribute("data-status")
        // let valQ = t('common:qRem');
        let valQ = (status === "remove") ? t('common:qRem') : t('common:qUpdate'); 
        let valComFirm = await Comfirm(valQ);
        if (valComFirm.isConfirmed) {
            let url = `orders/${id}`;
            let valOrder = await FetchData(url)().then(res => res.data);

            (status === "remove") ? (valOrder.status = 2) : (valOrder.status = 3);

            FetchData(url)('PUT', valOrder).then(res => {
                if(res.status >= 200 && res.status < 300) {
                    dispatch(FetchListOrdersPagAd());
                    Alert("success");
                }
            })
        }
    }

    useEffect(() => {
        dispatch(FetchListOrdersPagAd());
    }, []);
    return (
        <div className="orders mt-5">
            <Paper className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    dataTitle && dataTitle.map((item, index) => <TableCell key={index}>{item}</TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {value && value.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell >
                                        {item.id}
                                    </TableCell>
                                    <TableCell >
                                        {item.product.name}
                                    </TableCell>
                                
                                    <TableCell align="left">
                                        <img src={item.product.img} className="product__img" alt={ item.product.name } />
                                    </TableCell>
                                    <TableCell align="left">$ { item.price }</TableCell>
                                    <TableCell align="left">{ item.quantity }</TableCell>
                                    <TableCell align="left">{ item.name }</TableCell>
                                    <TableCell align="left">{ item.phone} </TableCell>
                                    <TableCell align="left">{ item.date }</TableCell>
                                    <TableCell align="left">
                                        {
                                            (item.status === 3) ? (
                                                <i className="fas fa-check" title="done"></i>
                                            ) :
                                            (item.status === 1) && (
                                                <>
                                                    <a href="" title="cancel order" data-status="remove" data-id={item.id} onClick={handleCancelOrder} className="btn btn-remove-order ">
                                                        <i className="fa fa-times" />
                                                    </a>
                                                    <a href="" onClick={handleCancelOrder}  data-status="update" title="delivered" data-id={item.id} className="ml-2 btn btn-update-order">
                                                        <i className="fa fa-pen" />
                                                    </a>
                                                </>
                                            ) 
                                        }
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
        </div>
    )
}
