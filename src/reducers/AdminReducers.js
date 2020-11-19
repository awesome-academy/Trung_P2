import * as types from '../common/constants/ActionsTypes';
const initial = {
    categories  : []
,   brands      : []
,   status_products : []
,   types       : []
,   cateById    : {} 
,   status_exc  : ""
,   list_products : {}
,   curent_page : 1
,   limit_item  : 4
,   numberCate  : 0
,   isShowDetailPro : false
,   productById : {}
,   numberCommentProductID : 0
,   show_detail_product : {
        productById : {},
        numberCommentProductID : 0,
        avg_rate_product : 0,
        data_chart : []
    }
,  orders : {
    lists : [],
    total : 0
}
};
export const admin = (state = initial, actions) => {
    switch(actions.type) {
        case types.FETCH_ORDERS_PAGE_ADMIN : {
            return {
                ...state,
                orders : {
                    lists : actions.payload,
                    total : actions.total
                }
            }
        }
        case types.COUNT_ORDER_PRODUCT_ID : {
            return {
                ...state,
                show_detail_product : {
                    ...state.show_detail_product,
                    data_chart : actions.payload
                }
            }
        }
        case types.COUNT_RATE_PRODUCT_ID : {
            return {
                ...state,
                show_detail_product : {
                    ...state.show_detail_product,
                    avg_rate_product : actions.payload,
                }
            }
        }

        case types.COUNT_COMMENT_PRODUCT_ID : {
            return {
                ...state,
                show_detail_product : {
                    ...state.show_detail_product,
                    numberCommentProductID : actions.payload,
                }
            }
        }

        case types.FETCH_PRODUCT_BY_ID : {
            return {
                ...state,
                show_detail_product : {
                    ...state.show_detail_product,
                    productById : actions.payload
                }
            }
        }

        case types.ADMIN_SHOW_DETAIL_PRODUCT : {
            return {
                ...state,
                isShowDetailPro : actions.payload
            }
        }
        case types.LIMIT_ITEM : {
            return {
                ...state,
                limit_item : actions.payload
            }
        }

        case types.CURENT_PAGE : {
            return {
                ...state,
                curent_page : actions.payload
            }
        }

        case types.UPDATE_CATE_BY_ID : {
            return {
                ...state,
                cateById : {}
            }
        }
        case types.GET_LIST_STATUS : {
            return {
                ...state,
                status_products : actions.payload
            }
        }

        case types.GET_LIST_BRANDS : {
            return {
                ...state,
                brands : actions.payload
            }
        }

        case types.GET_LIST_TYPES : {
            return {
                ...state,
                types : actions.payload
            }
        }

        case types.FETCH_CATEGORIES : {
            return {
                ...state,
                categories : actions.payload,
                numberCate : actions.total
            }
        }
        
        case types.GET_LIST_PRODUCTS : {
            return {
                ...state,
                list_products : actions.payload
            }
        }

        case types.STATUS_EXC : {
            return {
                ...state,
                status_exc : actions.payload
            }
        }

        case types.FETCH_CATEGORIES_ID : {
            return {
                ...state,
                cateById : actions.payload
            }
        }
        default : return {...state};
    }
}   