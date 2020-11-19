import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function PrivateAdminRouter({ children, ...rest }) {
    let check = localStorage.getItem("token");
    let role = localStorage.getItem("info_user") ? JSON.parse(localStorage.getItem("info_user")).userId : '';
    let history = useHistory();
    let curentPathName = history?.location?.pathname;
    return (
        <Route 
            {...rest}
            render={() => 
                (check && role == 1) ? children: <Redirect  to="/login-user"  to={{ pathname : '/login-user', state : { path : curentPathName }}}/> 
            }
        />
    );
}

