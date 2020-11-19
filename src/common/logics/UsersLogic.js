export const getChildCateClick = (data, nodes) => {
    let rootId = new Set();
    data.map(item => rootId.add(item.root));
    let getChildId;
    if (rootId.has(parseInt(nodes))) {
        getChildId = data.reduce((result, item) => {
            if (item.root == nodes) {
                result.push(item.id);
            }
            return result;
        }, []);
    } else {
        getChildId = data.reduce((result, item) => {
            if (item.parent_id == nodes) {
                result.push(item.id);
            }
            return result;
        }, [parseInt(nodes)]);
    }
    return getChildId;
}

export const CalcTotalMoneyCart = (valueCart, cart) => {
    let result = valueCart.reduce((sum, item) => {
        let valCart = cart.filter(cart => cart.id == item.item.id);
        sum += parseInt(valCart[0]?.quantity) * item.item.price;
        return sum;
    }, 0);
    return result;
}

export const GetStatusSortProducts = (value) => {
    let url;
    switch (value) {
        case "desc": {
            return url = "&_sort=name&_order=desc";
        }
        case 'asc': {
            return url = "&_sort=name&_order=asc";
        }
        case 'price_low': {
            return url = "&_sort=price&_order=desc";
        }
        case 'price_high': {
            return url = "&_sort=price&_order=asc";
        }
        default: return url = "&_sort=name&_order=asc";
    }
}
export const GetUrlSearchPrice = (value) => {
    let url;
    switch (value) {
        case "lte_100": {
            return url = "&price_lte=200";
        }
        case '100_200':
        case "200_400": {
            let val = value.split("_");
            let lte = val[0];
            let gte = val[1];
            return url = `&price_lte=${gte}&price_gte=${lte}`;
        }
        case 'gte_400': {
            return url = "&price_gte=400";
        }
        default: return url;
    }
}

export const GetFormatUrlSearchPrice = (check, url, value) => {
    let urlFormat;
    let find = url.indexOf("&price_");
    if (!check) {
        let search = GetUrlSearchPrice(value);

        if (find === -1) {
            let index = url.indexOf("&");
            urlFormat = url.substring(0, index) + search + url.substr(index);
        } else {
            let index = url.indexOf("&");
            urlFormat = url.substring(0, url.indexOf("&price")) + search + url.substr(url.indexOf("&categorieId"));
        }

    } else {
        urlFormat = (find !== -1) ? url.substring(0, url.indexOf("&price")) + url.substr(url.indexOf("&categorieId")) : url;
    }
    return urlFormat;
}


export const GetUrlFormatSearch = (check, url, value, type) => {
    let urlFormat;
    let search = '';
    if (check) {
        search += `&${type}=${value}`;
        let index = url.indexOf("&");
        urlFormat = url.substring(0, index) + search + url.substr(index);
    } else {
        let search = `&${type}=${value}`;
        urlFormat = url.replace(search, '');
    }
    return urlFormat;
}

export const SaveProductRecenty = (value) => {
    let values = localStorage.getItem("recently");
    let valRecetly = [];

    if (!values || values?.length == 0) {
        valRecetly.push(value);
        localStorage.setItem('recently', JSON.stringify(valRecetly));
    } else {

        let convertArr = JSON.parse(values);
        if (convertArr.includes(value)) {
            convertArr.splice(convertArr.findIndex(item => item == value), 1);
        }
        convertArr.unshift(value);
        localStorage.setItem('recently', JSON.stringify(convertArr));
    }

}

export const AddToCart = (id, quantity) => {
    let value = { id, quantity };
    let valCarts = localStorage.getItem("cart");
    let convertArr=[];

    if(valCarts){
        convertArr = JSON.parse(valCarts);
        let temps = convertArr.find(item => item.id == id);
    
        if (temps) {
            convertArr.map(item => {
                if (item.id == id) {
                    return item.quantity = item.quantity + quantity;
                }
            });
        } else {
            convertArr.push(value);
        }
    } else {
        convertArr.push(value)
    }

    localStorage.setItem('cart', JSON.stringify(convertArr));
} 
export const UpdateToCart = (id, quantity) => {
    let value = { id, quantity };
    let valCarts = localStorage.getItem("cart");
    let convertArr=[];

    if(valCarts){
        convertArr = JSON.parse(valCarts);
        let temps = convertArr.find(item => item.id == id);
    
        if (temps) {
            convertArr.map(item => {
                if (item.id == id) {
                    return item.quantity = quantity;
                }
            });
        } else {
            convertArr.push(value);
        }
    } else {
        convertArr.push(value)
    }

    localStorage.setItem('cart', JSON.stringify(convertArr));
} 

export const CalcNumberCart = () => {
    let values = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem('cart')) : [];
    let result = values.reduce((sum, item) => sum + item.quantity, 0);
    return result;
}

export const RemoveProInCart = (id) => {
    let values = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem('cart')) : [];
    let find = values.findIndex(item => item.id == id);
    find !== -1 && values.splice(find, 1); 
    localStorage.setItem("cart", JSON.stringify(values));
}

export function RateReviews(value){
    let rate;
    switch(true){
        case (value >= 4 && value < 5) : 
        {
            rate = <>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                </>
                break
        }
        case 5 : {
                rate =  <>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </>
                break;
        }
        case (value < 4 && value >= 3) :
        {
            rate = <>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                </>
            break;
             
        }
        case (value >= 2  && value < 3): 
        {
            rate =  <>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                </>
            break;
             
        }
        case (value >= 1 && value < 2) : 
        {
            rate =  <>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                </>
            break;
             
        }
        default : {
            rate = <>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                </>
            break;
        }
    }
    return rate;
}