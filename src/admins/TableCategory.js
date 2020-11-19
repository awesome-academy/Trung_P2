import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination } from '@material-ui/core';
import { RemoveCategory , FetchCategories} from "../actions/ActionCategory";
import { UpdateStateExc } from "../actions/Common";
import { FetchUrl } from "../actions/Common";
import { useDispatch, useSelector } from 'react-redux';
import { Comfirm } from "../common/Alert";
import { getCurentPage, getListProductsPageAdmin, getCategories} from "../selectors/AdminSelectors";
import {FetchProductsPageAdmin, UpdateCurrentPage, UpdateLimitItem} from "../actions/ProductsAction";
import PropTypes from "prop-types";


TableCategory.propTypes = {
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

export default function TableCategory(props) {
    let dispatch = useDispatch();
    const classes = useStyles();
    let page = useSelector(state => getCurentPage(state));
    let rowsPerPage = useSelector(state => state.admin.limit_item);
    let value = useSelector(state => getCategories(state));
    let total = useSelector(state => state.admin.numberCate);

    const handRemoveCate =async (event) => {
        event.preventDefault();
        if(value.length === 1 && page > 0){
            dispatch(UpdateCurrentPage(page));
        } else if( value?.length === 1 && page === 0){
            dispatch(UpdateCurrentPage(1));
        }
        let id = event.currentTarget.getAttribute("data-id");
        let checkComfirm = await Comfirm("Do you want remove it?");
        checkComfirm?.isConfirmed && await dispatch(RemoveCategory(id));

        dispatch(FetchUrl("categories", "FETCH_ALL_CATE"));
    }

    const handUpdateCate = async (event) => {
        event.preventDefault();
        let id = event.currentTarget.getAttribute("data-id");
        let url = `categories/${id}`;
        dispatch(FetchUrl(url, "FETCH_CATEGORIES_ID"));
        await document.getElementById("category").click();
        await dispatch(UpdateStateExc("update"));
        dispatch(FetchUrl("categories", "FETCH_ALL_CATE"));
    }

    const handleChangePage = (event, newPage) => {
        event.preventDefault();
        dispatch(UpdateCurrentPage(newPage+1));
        dispatch(FetchCategories());
    };

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        console.log(+event.target.value)
        dispatch(UpdateLimitItem(+event.target.value));
        dispatch(FetchCategories());
    };

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
                        {props.data && props.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component="th">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">
                                    {props.allCate.map(cate => 
                                        (item.parent_id == cate.id) && cate.name 
                                        
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <a href="" data-id={ item.id } onClick={handUpdateCate} className="table__action">
                                        <i className="fas fa-pen"></i>
                                    </a>
                                    <a href="" data-id={ item.id } onClick={handRemoveCate} className="table__action table__action--format-col">
                                        <i className="fas fa-times"></i>
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
