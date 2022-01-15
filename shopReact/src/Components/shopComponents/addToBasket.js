import { Button, Modal } from "react-bootstrap";
import React, { Component } from 'react';
import "./AddToBasket.css"
import { Form } from "react-bootstrap";
import axios from "axios";

class AddToBasket extends Component{
    constructor(props){
        super(props)
        this.state={
            validationMessage:"",  
            amount:1,
            totalPrice:(Math.round(this.props.price * 100) / 100).toFixed(2)
        }
    }
    changeAmount=(e)=>{
     
      this.setState({
        amount:e.target.value,
        validationMessage:"",
        totalPrice:e.target.value*this.props.price
      })
    }
    render(){
  return(this.props.trigger) ? (
    
    <div className='basket'>
  <Modal.Dialog>
    <Modal.Header >
      <Modal.Title>Dodaj do koszyka - {this.props.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div>
        <Form.Label>Cena: {(Math.round(this.props.price * 100) / 100).toFixed(2)}PLN</Form.Label>
            <Form.Group className="mb-3" >
                <Form.Label>Ilość:</Form.Label>
                <input className="form-control" type="number" placeholder="1" min='1'  max="999" 
                                                        onChange={this.changeAmount.bind(this)} />
            </Form.Group>
            <div>{this.state.validationMessage}</div>
        </div>
  </Modal.Body>
  <Modal.Footer>
        <div className="totalPrice">{(this.state.amount>0) ? (<div>{(Math.round(this.state.totalPrice * 100) / 100).toFixed(2)}PLN</div>):(<div>{this.props.price}</div>)}</div>
  		<Button variant="primary" onClick={() => {
            if(this.state.amount>0){
                const url = "http://localhost:5232/api/Order/AddToBasket?productId="+this.props.productId+"&amount="+this.state.amount;
                axios.defaults.withCredentials=true;
                axios.post(url,{
                                  headers: {
                                    'Content-Type': 'application/json',                        
                                  },                        
                              }
                          )
                          .then(res => {
                              console.log(`Success` + res.data);
                              this.setState({validationMessage:""})
                              this.props.setTrigger(false)           
      
                          })
                          .catch(err => {
                              console.log(err);
                          })
                    
                    }
            else{this.setState({validationMessage:"Zła wartość"})}
				  }}>Dodaj do koszyka</Button>
          <Button variant="secondary" onClick={()=> this.setState({displayForm:false,validationMessage:''},this.props.setTrigger(false))}>Anuluj</Button>
          </Modal.Footer>
</Modal.Dialog>
       
      </div>) : null;
}}
export default AddToBasket
  