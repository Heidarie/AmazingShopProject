import React, { useState } from 'react';
import AddToBasket from './addToBasket';
import "./product.css"
import { Button } from 'react-bootstrap';

function Product (props) {

    const [display, setDisplay] = useState(false);
    
    console.log(props)
	return <div  className="product">
    <div className='photo'><img src={`data:image/jpeg;base64,${props['image']}`} className='img-fluid shadow-4' alt='...' /></div>
	<div className='name'><h2>{ props["name"] } </h2></div>
    <div className='description'>{props["description"]}</div>
    <div className="price"><h2>{props["price"]} PLN</h2></div>
    <div className='stock'><Button variant="outline-primary" disabled={!props.isAuth} onClick={()=>setDisplay(true)}>Dodaj do koszyka</Button> 
    W magazynie: { props["stockAmount"] }</div>
    
    <AddToBasket trigger={display} name={props["name"]} productId={props["id"]} price={props["price"]}  setTrigger={setDisplay}></AddToBasket>
    </div>;
    
}

export default Product