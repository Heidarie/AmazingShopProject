import "./item.css"
import { Form } from 'react-bootstrap';

function Item (props) {
 
   const {handleChecked} = props;
	return <div  className="item">
    <div className='photo'><img src={`data:image/jpeg;base64,${props['image']}`} className='img-fluid shadow-4' alt='...' /></div>
	<div className='name'><h2>{ props["name"] } Ilość: {props['amount']}</h2></div>
    <div className='description'>{props["description"]}</div>
    <div className="price"><h2>{props["price"] * props["amount"]} PLN</h2></div>
    <Form.Check type="checkbox" onChange={(e)=>(handleChecked(props['id'], e.target.checked))}  checked={props['isChecked']}    />
    </div>;
    
}

export default Item