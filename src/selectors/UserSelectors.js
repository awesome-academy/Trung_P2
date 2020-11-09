import * as selects from "./CommonSelectors";
import {createSelector} from "reselect";

export const GetCateParent = createSelector(
    selects.GetCate,
    (allCate) => allCate.filter( (item) => item.id === item.root)
);

export const GetCateByIdParent = (id) => createSelector(
    selects.GetCate,
    allCate => allCate.filter(item => item.parent_id == id && item.id != id)
)