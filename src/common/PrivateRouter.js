import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function PrivateRouter({ children, ...rest }) {
    let check = localStorage.getItem("token");
    let history = useHistory();
    let curentPathName = history?.location?.pathname;
    return (
        <Route 
            {...rest}
            render={() => 
                check ? children: <Redirect  to="/login-user"  to={{ pathname : '/login-user', state : { path : curentPathName }}}/> 
            }
        />
    );
}
