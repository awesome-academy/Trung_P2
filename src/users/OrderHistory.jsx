import React, { useState } from 'react'
import { useEffect } from 'react';
import { Comfirm } from '../common/Alert';
import FetchData from '../common/Api';
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import Rating from '@material-ui/lab/Rating';
import {Alert} from "../common/Alert";

export default function OrderHistory() {
    const { t } = useTranslation(['common'])
    const [data, setData] = useState([]);
    let userID = localStorage.getItem('info_user') && JSON.parse(localStorage.getItem('info_user')).userId;

    const FetchDataOrders = (userId) => {
        let url = `orders?userId=${userId}&_expand=product`;
        FetchData(url)().then(res => {
            setData(res.data);
        });
    }

    useEffect(() => {
        FetchDataOrders(userID)
    }, []);

    const handleCancelOrder = async (event) => {
        event.preventDefault();
        let id = event.currentTarget.getAttribute("data-id");
        let url = `orders/${id}`;
        let valQ = t('common:qRem');
        let valComFirm = await Comfirm(valQ);
        if (valComFirm.isConfirmed) {
            let valOrderId = await FetchData(url)().then(res => res.data);
            valOrderId.status = 2;
            FetchData(url)('PUT', valOrderId).then(res => {
                FetchDataOrders(userID);
            });
        }
    }

    return (
        <>
            <p className="register__title">Đơn hàng của tôi</p>
            <div className="customers__wrapper mt-4">
                <table className="w-100">
                    <thead>
                        <tr>
                            <th className="w-20">Mã đơn hàng</th>
                            <th className="w-15">Ngày mua</th>
                            <th className="w-40">Sản Phẩm</th>
                            <th className="w-15">Tổng tiền</th>
                            <th className="w-10">Trạng thái đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 && data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.date}</td>
                                    <td>{item.product.name}</td>
                                    <td>$ {item.price}</td>
                                    <td className="text-center">
                                        {
                                            (item.status === 1) ? (
                                                <a href="" title="cancel order" data-id={item.id} onClick={handleCancelOrder} className="btn-remove-order">
                                                    <i className="fa fa-times" />
                                                </a>
                                            ) :
                                            (item.status === 2) ? (
                                                <i className="fas fa-minus-circle" title="order has been deleted"></i>
                                            ) :
                                            (
                                                <>
                                                    <button type="button" id="comment" title="comment product" className="category__icon--format" data-toggle="modal" data-target="#modalReview">
                                                        <i className="far fa-comment"></i>
                                                    </button>
                                                    <ModalComment product={item.product.name} idPros={ item.product.id }/>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}


function ModalComment(props) {
    const [value, setValue] = useState(0);
    const [valComment, setValComment] = useState('');

    const handleCommentProduct = event => {
        event.preventDefault();
        let value = event.target.value;
        setValComment(value);
    }

    const handleSubmitComment = event => {
        event.preventDefault();
        let {idPros} = props;
        let userId = localStorage.getItem('info_user') && JSON.parse(localStorage.getItem('info_user')).userId;
        let values ={userId, productId : idPros, description : valComment, rate : value};
        let url = "comments";
        FetchData(url)('POST', values).then(res => (res.status >= 200 && res.status < 300 ) && Alert("success"));
    }

    return (
        <div className="modal fade" data-keyboard="false" data-backdrop="static" id="modalReview" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add comment</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p className="register__title">{ props?.product }</p>
                        <form className="form-comment">
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                  }}
                            />
                            <div className="d-flex my-3">
                                <span className="note-title product__des">Add Comments</span>
                            </div>
                            <div className="d-flex">
                                <textarea name="comment" value={valComment} onChange={handleCommentProduct} className="comment rounded" rows="2"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="close-modal" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" onClick={handleSubmitComment} className="btn btn-primary">Comment</button>
                    </div>
                </div>
            </div>
        </div>
    )

}