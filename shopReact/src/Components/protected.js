import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import AdminOrders from './AdminOrders/AdminOrder';
import ProductForm from './AdminOrders/AddProduct/ProductForm';


export function Protected(props) {

    let navigate = useNavigate();
    if(props.isAdmin){
        if(props.component=="AdminOrders"){
        return (
            <AdminOrders/>)
    }
    else{
        return(
            <ProductForm/>
        )
    }

}
else{
    navigate("/", { replace: true });
}
   
}