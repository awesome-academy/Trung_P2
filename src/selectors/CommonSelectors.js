export const getCategories = state => state.admin.categories;
export const getCategoryById = state => state.admin.cateById;

export const getListProductsPageAdmin = state => state.admin.list_products.values;

export const getListStatusProducts = state => state.admin.status_products;
export const getListBrands = state => state.admin.brands;
export const getListTypes = state => state.admin.types;

export const getStatusExecute = state => state.admin.status_exc;

export const getTotalProductPageAdmin = state => state.admin.list_products.total;

export const getCurentPage = state => state.admin.curent_page;

export const getProductById = state =>state.admin.list_products.values;

// USER
export const GetCate =  state => state.users.allCate;
export const GetListProductsCateId = state => state.users.productsCateId;
export const GetTotalProduct = state => state.users.listProducts.total;
export const GetListProducts = state => state.users.listProducts.products;
export const GetListCates = state => state.users.listCates;

export const GetHotProducts = state => [...state.users.recentlyPros];