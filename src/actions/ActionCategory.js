import * as types from '../common/constants/ActionsTypes';
import FetchData from '../common/Api';
import {Alert} from "../common/Alert";
import {useTranslation} from "react-i18next";
import "../translations/i18n";
export const UpdateCateById = () => {
    return{
        type : types.UPDATE_CATE_BY_ID
    }
}
export const UpdateCategory = (id, values) => {
    return (dispatch) => {
        try {
            FetchData(`categories/${id}`)("PUT", values).then( responses => {
                dispatch(FetchCategories());
                dispatch(UpdateCateById());
                Alert("success");
            });
        } catch (error) {
            console.log(error)
            Alert('error');
        }
    }
}

export const FetchCategories = () => {
    return (dispatch, getState) => {
        let {curent_page, limit_item} = getState().admin;
        let url = `categories?_page=${curent_page }&_limit=${ limit_item }`;
        try {
            FetchData(url)().then( responses => {
                dispatch({
                    type : types.FETCH_CATEGORIES,
                    payload : responses.data,
                    total : responses.headers["x-total-count"]
                });
            })
        } catch (error) {
            console.log(error)
            Alert('error');
        }
    }
}

export const RemoveCategory = (id) => {
    return (dispatch) => {
        try {
            FetchData(`categories/${id}`)("DELETE").then( responses => {
                dispatch(FetchCategories());
                Alert('success');
            });
        } catch (error) {
            Alert('error');
        }
    }
}

export const CreateCategory = (values) => {
    return(dispatch) => {
        try {
            if(values.root){
                FetchData("categories")('post', values).then( responses => {
                    dispatch(FetchCategories());
                    Alert('success');
                });
            }
            else {
                FetchData("categories")('post', values).then( responses => {
                    let value = responses.data;
                    let id = value.id;
                    values.parent_id = id;
                    values.root = id;
                    FetchData(`categories/${id}`)('PUT', values).then(responsesponse => {
                        dispatch(FetchCategories());
                        Alert('success');
                    })
                });
            }
        } catch (error) {
            console.log(error);
            Alert('error');          
        }
    }
}