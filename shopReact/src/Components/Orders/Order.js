import React, { useState } from 'react';
import "./order.css"

function Order (props) {

	return <div  className="or">
	<div className='date'><h2>Data zamówienia: {props["date"].slice(0,10) } </h2></div>
    <div className='status'>Stauts: {props["status"]}</div>
    <div className='cena'>Cena: {props["orderPrice"]} PLN</div>
    <ul className="list-group">
  
</ul>
    <div className="orderedItems"> 
     {props.products.map((x,i)=> <li key={i} >{x.name} - {x.price} PLN, {x.amount} sztuk </li>)}
    </div>
    </div>;
    
}

export default Order