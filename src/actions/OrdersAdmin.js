import FetchData from "../common/Api";
import * as types from "../common/constants/ActionsTypes";
export const FetchListOrdersPagAd = () => {
    return (dispatch, getState) => {
        let {curent_page, limit_item} = getState().admin;
        let url = `orders?status_ne=2&_expand=product&_expand=user&_page=${curent_page}&_limit=${limit_item}`;
        FetchData(url)().then(res => {
            if(res.status >= 200 && res.status < 300){
                dispatch({
                    type : types.FETCH_ORDERS_PAGE_ADMIN,
                    payload : res.data,
                    total : res.headers['x-total-count']
                })
            }
        });
    }
}