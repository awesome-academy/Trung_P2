import * as types from "../common/constants/ActionsTypes";

const intinial = {
    allCate : [],
    productsCateId : [],
    listProducts : {
        products : [],
        total : 0 
    },
    listBrands : [],
    listTypes : [],
    listCates : [],
    url : "",
    recentlyPros : [],
    numberOfCart : 0,
    cartHover : [],
    proDetail : {
        product : {},
        nRate : 0,
        nComment : 0
    },
}
export const users = (state = intinial, actions) =>{
    switch(actions.type){
        case types.USER_COUNT_RATE_BY_ID : {
            return {
                ...state,
                proDetail : {
                    ...state.proDetail,
                    nRate : actions.payload
                }
            }
        }
        case types.USER_COUNT_COMMENT_BY_ID : {
            return {
                ...state,
                proDetail : {
                    ...state.proDetail,
                    nComment : actions.payload
                }
            }
        }
        case types.USER_GET_PRODUCT_BY_ID : {
            return {
                ...state,
                proDetail : {
                    ...state.proDetail,
                    product : actions.payload
                }
            }
        }
        case types.FETCH_PRODUCT_HOVER_CART : {
            return {
                ...state,
                cartHover : actions.payload
            }
        }
        case types.GET_NUMBER_OF_CART : {
            return {
                ...state,
                numberOfCart : actions.payload
            }
        }
        case types.FETCH_PRODUCT_RECENTLY : {
            return {
                ...state,
                recentlyPros : actions.payload
            }
        }
        case types.UPDATE_URL : {
            return {
                ...state,
                url : actions.payload
            }
        }
        case types.FETCH_CATE_CATE_ID : {
            return {
                ...state,
                listCates : actions.payload
            }
        }
        case types.FETCH_TYPE_CATE_ID : {
            return {
                ...state,
                listTypes : actions.payload
            }
        }
        case types.FETCH_BRAND_CATE_ID : {
            return {
                ...state,
                listBrands : actions.payload
            }
        }
        case types.FETCH_PRODUCT_SEARCH : {
            return {
                ...state,
                listProducts :{
                    products: actions.payload,
                    total : actions.total
                } 
            }
        }
        case types.FETCH_ALL_CATE : {
            return {
                ...state,
                allCate : actions.payload
            }
        }
        case types.FETCH_PRODUCT_CATE_ID : {
            return {
                ...state,
                productsCateId : actions.payload
            }
        }
        default : return {...state}
    }
}