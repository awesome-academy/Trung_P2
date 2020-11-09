import * as selects from "./CommonSelectors";
import { createSelector } from 'reselect';

export const getCategories = createSelector(
    selects.getCategories,
    categories => categories
);

export const getCategoryById = createSelector(
    selects.getCategoryById,
    cateById => cateById
)

export const getListProductsPageAdmin = createSelector(
    selects.getListProductsPageAdmin,
    values => values
)

export const getListStatusProduct = createSelector(
    selects.getListStatusProducts,
    status_products => status_products
)

export const getListBrands = createSelector(
    selects.getListBrands,
    brands => brands
)

export const getListTypes = createSelector(
    selects.getListTypes,
    types => types
)

export const getStatusExecute = createSelector(
    selects.getStatusExecute,
    status_exc => status_exc
)

export const getTotalProductPageAdmin = createSelector(
    selects.getTotalProductPageAdmin,
    total => total
)

export const getCurentPage = createSelector(
    selects.getCurentPage,
    curent_page => curent_page == 0 ? curent_page : curent_page - 1
)