import * as types from "../common/constants/ActionsTypes";

const intinial = {
    allCate : []
}
export const users = (state = intinial, actions) =>{
    switch(actions.type){
        case types.FETCH_ALL_CATE : {
            return {
                ...state,
                allCate : actions.payload
            }
        }
        default : return {...state}
    }
}