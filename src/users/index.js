import React, {useEffect, useSelector} from 'react';
import {useDispatch} from "react-redux";
import {FetchUrl} from "../actions/Common";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

export default function HomePage() {
    const dispatch = useDispatch();
    
    useEffect(() =>{
        let url = "categories";
        dispatch(FetchUrl(url, "FETCH_ALL_CATE"));
    }, []);

    return (
        <div className="homepage">
            <header>
                <div className="top">
                    <HeaderTop />
                </div>
            </header> 
            <HeaderBottom />
            <main>
                
            </main>
        </div>
    )
}
