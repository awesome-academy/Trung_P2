import * as types from "../common/constants/ActionsTypes";
import FetchData from "../common/Api";
import { Alert } from "../common/Alert";
import { UpdateCateById } from "./ActionCategory";


export const GetListOrderProduct = (id, from, end) =>{
    let url = `products-orders/${id}/${from}/${end}`;
    return (dispatch) => {
        FetchData(url)().then( res => {
            dispatch({
                type : types.COUNT_ORDER_PRODUCT_ID,
                payload : res.data
            })
        })
    }
}

export const CountRateProductId = (id) =>{
    let url = `get-avg-rate-product/${id}`;
    return (dispatch) => {
        FetchData(url)().then( res => {
            dispatch({
                type : types.COUNT_RATE_PRODUCT_ID,
                payload : res.data ? res.data : 0
            });
        })
    }
}

export const CountCommentProductById = (id) => {
    let url = `products/${id}/comments?_limit=1`;
    return (dispatch) => {
        FetchData(url)().then( res => {
            dispatch({
                type : types.COUNT_COMMENT_PRODUCT_ID,
                payload : res.headers['x-total-count']
            })
        });
    }
}


export const GetProductById = (value) => {
    return {
        type : types.FETCH_PRODUCT_BY_ID,
        payload : value
    }
}
 
export const UpdateCurrentPage = (value) => {
    return {
        type : types.CURENT_PAGE,
        payload : value
    }
}

export const UpdateLimitItem = (value) => {
    return {
        type : types.LIMIT_ITEM,
        payload : value
    }
}

export const UpdateStatusShowDetailProduct = (value) => {
    return {
        type : types.ADMIN_SHOW_DETAIL_PRODUCT,
        payload : value
    }
}

export const FetchProductsPageAdmin = () => {
    // let url = `products?_expand=type&_expand=categorie&_expand=status&_expand=brand`;
    return (dispatch, getState) => {
        let {curent_page, limit_item} = getState().admin;
        let url = `products?_expand=type&_expand=categorie&_expand=status&_expand=brand&_page=${curent_page }&_limit=${ limit_item }`;
        FetchData(url)().then(res => {
            let values = res.data;
            let total = res.headers["x-total-count"];
            dispatch({
                type : types.GET_LIST_PRODUCTS,
                payload : { values, total }
            })
        });
    }
}

export const UpdateProduct= (id, values) => {
    return (dispatch) => {
        try {
            FetchData(`products/${id}`)("PUT", values).then( res => {
                dispatch(FetchProductsPageAdmin());
                dispatch(UpdateCateById());
                Alert('success');
            });
        } catch (error) {
            console.log(error)
            Alert('error');
        }
    }
}


export const CreateProduct = (values) => {
    let url = "products";
    return (dispatch) => {
        try {
            FetchData(url)("POST", values).then( res => {
                dispatch(FetchProductsPageAdmin());
                Alert("success");
            });
        } catch (error) {
            console.log(error);
            Alert("error");
        }
    }
}

export const RemoveProduct = (url) => {
    return (dispatch) => {
        try {
            FetchData(url)("DELETE").then( res => {
                dispatch(FetchProductsPageAdmin());
                Alert('success');
            });
        } catch (error) {
            Alert('error');
        }
    }
}