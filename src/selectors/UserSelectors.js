import * as selects from "./CommonSelectors";
import {createSelector} from "reselect";

export const GetCateParent = createSelector(
    selects.GetCate,
    (allCate) => allCate.filter( (item) => item.id === item.root)
);

export const GetCateByIdParent = (id) => createSelector(
    selects.GetCate,
    allCate => allCate.filter(item => item.root == id && item.id != id)
);

export const GetIdCateWithURL = (value) => createSelector(
    selects.GetCate,
    allCate => allCate.reduce((result,item) => {
        if(item.name === value){
            result = item.id;
        }
        return result;
    }, '')
)

export const GetHotProducts = createSelector(
    selects.GetHotProducts,
    recentlyPros => recentlyPros.sort((a,b) => b.id - a.id)
)

export const GetProductsCateId = createSelector(
    selects.GetListProductsCateId,
    productsCateId => productsCateId
);

export const GetListCates = createSelector(
    selects.GetListCates,
    listCates => listCates.filter(item => item.id !== item.parent_id)
);

// let values= new Set();
// function reFind(value, length, id){
//     let temp = id;
//     if(length < 0) return;
//     if(value[length].id == id){
//         temp = value[length].parent_id;
//         values.add(value[length].id);
//     } 
//     return reFind(value, length - 1, temp); 
// }

// export const GetBreadCrumb = id => createSelector(
//     selects.GetCate,
//     allCate  => {
//         let value = allCate.find(item => item.id == id);
        
//         if(value){
//             let vals = allCate.filter(item => item.root === value.root).sort((a, b) => a.id - b.id)
//             let check = vals.findIndex(item => values.has(item.id) );
//             console.log(check);
//             reFind(vals, vals.length - 1, id);
//             // return values;
//         }
//     }
// )

