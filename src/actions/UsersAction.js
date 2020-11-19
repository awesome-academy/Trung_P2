import * as types from "../common/constants/ActionsTypes";
import FetchData from "../common/Api";
import {Alert} from "../common/Alert";
export const FetchProductSearch = (url) => {
    return (dispatch) => {
        FetchData(url)().then(responses => {
            let data  = responses?.data;
            let total  = responses?.headers['x-total-count'];
            dispatch({
                type: types.FETCH_PRODUCT_SEARCH,
                payload : data,
                total 
            })
        })
    }
}

export const UpdateUrl = (value) => {
    return {
        type : types.UPDATE_URL,
        payload : value
    }
}

export const GetValCartHover = (url, cart) => {
    return (dispatch) => {
        FetchData(url)().then(responses => {
            let data  = responses?.data;
            let value = data.reduce((result,item) => {
                cart.map(val => {
                    if(val.id == item.id){
                        let {quantity} = val;
                        result.push({item, quantity });
                    }
                })
                return result;
            },[]);
            dispatch({
                type: types.FETCH_PRODUCT_HOVER_CART,
                payload : value
            })
        })
    }
}


export const UserOrderPro = (values) => {
    let url = "orders";
    let orders = values.map(item => {
        FetchData(url)('post', item)
    })
    Promise.all(orders).then(res => {
        localStorage.setItem('cart', []);
        Alert('success');
    });

}