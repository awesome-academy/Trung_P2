import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FetchData from '../common/Api';
import { Alert } from '../common/Alert';

export default function SugguestProduct() {
    const [data, setData] = useState({
        name : '',
        img : ''
    })

    const handleChange = event => {
        event.preventDefault();
        let {value} = event.target;
        setData({
            ...data,
            name : value
        });
    }

    const handleChangeUpImg = event => {
        event.preventDefault();
        let {files} = event.target;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
    	reader.onload = (e) => {
            let value = e.target.result;
            setData({
                ...data,
                img : value
            });
    	}
    }

    const handleSugguest = event => {
        event.preventDefault();
        let url = "sugguests";
        FetchData(url)('POST', data).then(res => (res.status >= 200 && res.status < 300 && Alert("success")));
    }

    return (
        <div className="sugguest">
            <div className="sugguest__logo text-center">
                <img src="https://cdn.shopify.com/s/files/1/0270/5873/3109/files/cospora-logo-compressor.png?v=1575949779" alt="" className="sugguest__img" />
            </div>
            <p className="sugguest__title text-center mt-5">Sugguest more product to admin</p>
            <p className="sugguest__ques text-center">Please leave the product you want to buy. We are here to help!</p>

            <form className="register__form-info-user sugguest__form mt-5" >
                <div className="register__form-group">
                    <TextField
                        id="outlined-error"
                        variant="outlined"
                        onChange={handleChange}
                        value={data.name}
                        name="name"
                        size="small"
                        label="Name Product"
                    />
                </div>
                <div className="col-12 text-center mt-2" >
                    <label htmlFor="upImg" className="custom-button-upload-img">
                        <i className="fas fa-upload"></i>
                        Up images
                    </label>
                    <input  onChange={ handleChangeUpImg } name="img" id="upImg" accept="image/*" type="file" />
                    {data.img && (<img src={data.img} className="product__img-upload" alt={data.name} />) }
            </div>
                <button type="submit" onClick={handleSugguest} className="btn-checkout btn-checkout-format  w-100 d-block">
                    Send Sugguest
                </button>
            </form>
        </div>
    )
}
