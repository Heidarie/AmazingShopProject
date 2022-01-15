import React, { useState } from 'react';
import "./adminOrder.css"
import {Button} from "react-bootstrap"
import axios from 'axios';

function AdminOrders (props) {
    function ForceUpdate(){
        const [value, setValue] = useState(0); 
        return () => setValue(value => value + 1); 
    }
    const changeStatus = (e)=>{
        alert(props['orderId']+" "+e.target.value)
        const url = "http://localhost:5232/api/Order/ChangeOrderStatus?orderId="+props["orderId"]+"&status="+e.target.value;      
            axios.defaults.withCredentials=true;
            axios.post(url,{
                              headers: {
                                'Content-Type': 'application/json',                        
                              },                        
                          }
                      )
                      .then(res => {
                          console.log(`Success` + res.data);
                          ForceUpdate()         
  
                      })
                      .catch(err => {
                          console.log(err);
                      })
    }


	return <div  className="AdminOrder">
	<div className='date'><h2>Data zamówienia: {props["date"] } </h2></div>
    <div className='status'>Stauts: {props["status"]}</div>
    <div className='cena'>Cena: {props["orderPrice"]} PLN</div>
    <ul className="list-group">
  

    <div className="orderedItems"> 
     {props.products.map((x,i)=> <li key={i} >{x.name} - {x.price} PLN, {x.amount} sztuk</li>)}
     <div className='status'>
     <h3>Zmień status</h3>
     <Button onClick={changeStatus.bind(this)} value="2">Wysłane</Button> 
     <Button onClick={changeStatus.bind(this)} value="3">Odebrane</Button> 
     <Button onClick={changeStatus.bind(this)} value="4">Anulowane</Button>
     </div>
    </div>
    </ul>
    </div>;
    
}

export default AdminOrders