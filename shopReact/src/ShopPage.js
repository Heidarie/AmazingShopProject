import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Shop from './shop';


export function ShopPage(props) {
    let { page } = useParams(); 
    let navigate = useNavigate();
    return (
        <Shop page={page} isAuth={props.isAuth} changePage = {navigate} />)
}