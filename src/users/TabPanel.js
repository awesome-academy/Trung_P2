import React, { useEffect, useRef, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import { useParams } from 'react-router-dom';
import FetchData from '../common/Api';
import Pagination from '@material-ui/lab/Pagination';
import {useTranslation} from "react-i18next";
import "../translations/i18n";

export default function TabPanel() {
    const [status, setStatus] = useState('descriptions');
    const {t} = useTranslation(['users']);
    return (
        <div className="tabs">
            <div className="tabs-title col-12">
                <ul className="tabs__list">
                    <li onClick={() => setStatus('descriptions')} className= {status === "descriptions" ? "tabs__item tabs__item--active d-inline-block" : "tabs__item d-inline-block" } >
                        {t('users:Detail.desc')}
                    </li>
                    <li onClick={() => setStatus('review')} className= {status === "review" ? "tabs__item tabs__item--active d-inline-block" : "tabs__item d-inline-block" } >
                        {t('users:Detail.cusReview')}
                    </li>
                </ul>
            </div>
            <div className="container">
                {
                    status === "descriptions" ? <Descriptions /> : <Reviews />
                }
            </div>
        </div>
    )
}

export function Reviews(){
    let params = useParams();
    const {t} = useTranslation(['users']);
    let {id} = params;
    const replyRef = useRef([]);
    const [data, setData] = useState();
    const [total, setTotal] = useState(0);
    const [currentPag, setCurrentPag] = useState(1);
    const [comment, setComment] = useState('');
    const FetchComment = (id, currentPag) => {
        let url = `comments?productId=${id}&_expand=user&_page=${currentPag}&_limit=4&_sort=id&_order=desc`;
        FetchData(url)().then( res => {
            if(res.status >= 200 && res.status < 300){
                setData(res.data);
                let total = parseInt(res.headers['x-total-count']) / 4 ;
                setTotal(Math.ceil(total));
            }
        });
    }
    useEffect(() =>{
        FetchComment(id, currentPag)
    }, []);

    const handleChangePage = (event, value) => {
        event.preventDefault();
        setCurrentPag(value);
        FetchComment(id, value);
    }

    const handleChangeComment = event => {
        event.preventDefault();
        let {value} = event.target;
        setComment(value);
    }

    const onClickLinkReply = event => {
        event.preventDefault();
        let id  = event.target.getAttribute('data-id');
        replyRef.current[id].classList.toggle("form-reply--active");

    }

    const handleSubmitReply = event => {
        event.preventDefault();
        let id  = event.target.getAttribute('data-id');
        let values = {commentId : id, description : comment};
    }

    return (
        <div className="review">
            <div className="review__wrapper">
                {
                    data && data.map(item => (
                        <div className="review__block border-top py-4" key={item.id}>
                            <div className="top">
                                <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=2&_nc_sid=12b3be&_nc_ohc=1K-Uj6h6bZcAX9hIErQ&_nc_ht=scontent.fsgn2-3.fna&tp=27&oh=768e33aa4083c785b0490e4a91e558f8&oe=5FD74739" alt="" className="review__img rounded-circle"/>
                                <p className="review__name d-inline-block">{ `${item.user.last_name} ${item.user.first_name}` }</p>
                            </div>
                            <div className="rating my-3">
                                <Rating
                                    name="simple-controlled"
                                    value={item.rate}
                                    readOnly
                                />
                            </div>
                            <p className="review__des">
                                {
                                    item.description
                                }
                            </p>
                            <span data-id={item.id} onClick={onClickLinkReply} className="review__send-question position-relative review__link d-inline-block">
                                {t('users:Detail.sendQ')}
                            </span>
                            <span className="review__read-more review__link d-inline-block">
                                {t('users:Detail.readMore')}
                            </span>
                            <form action="" className="form-reply mt-2" ref={el => replyRef.current[item.id] = el}>
                                <div className="d-flex">
                                    <textarea name="comment" onChange={handleChangeComment} value={comment} className="comment rounded" rows="2" placeholder="viết câu trả lời bình luận"></textarea>
                                </div>
                                <button data-id={item.id} onClick={handleSubmitReply} className="btn btn-warning mt-2">
                                    Gửi
                                </button>
                            </form>
                        </div>
                    ))
                }
                {
                    total ? (
                        <div className="pagination mt-3 mb-5">
                            <Pagination count={parseInt(total)} page={currentPag} onChange={handleChangePage}  color="primary" />
                        </div>
                    ) : <p className="text-center mt-5"> Sản phẩm chưa có đánh giá.</p>
                }
                
            </div>
        </div>
    )
}



export function Descriptions(){
    return (
        <div className="descripts">
            <p className="descripts__pa">
            Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo pharetras loremos.Donec pretium egestas sapien et mollis.
            </p>
            <p className="descripts__title">
                Sample Unordered List
            </p>
            <ul>
                <li className="descripts__item">Comodous in tempor ullamcorper miaculis.</li>
                <li className="descripts__item">Divamus sit amet purus justo.</li>
                <li className="descripts__item">Proin molestie egestas orci ac suscipit risus posuere loremous.</li>
            </ul>
            <p className="descripts__title">
                Sample ordered List
            </p>
            <ol>
                <li className="descripts__item">Comodous in tempor ullamcorper miaculis.</li>
                <li className="descripts__item">Divamus sit amet purus justo.</li>
                <li className="descripts__item">Proin molestie egestas orci ac suscipit risus posuere loremous.</li>
            </ol>
            <p className="descripts__title">
                Sample Unordered List
            </p>
            <p className="descripts__pa">
                Praesent vestibulum congue tellus at fringilla. Curabitur vitae semper sem, eu convallis est. Cras felis nunc commodo eu convallis vitae interdum non nisl. Maecenas ac est sit amet augue pharetra convallis nec danos dui. Cras suscipit quam et turpis eleifend vitae malesuada magna congue. Damus id ullamcorper neque. Sed vitae mi a mi pretium aliquet ac sed elito.
            </p>
        </div>
    )
}