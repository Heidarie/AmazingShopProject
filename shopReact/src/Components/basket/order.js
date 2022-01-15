import { Button, Modal } from "react-bootstrap";
import React, { Component } from 'react';
import "./order.css"
import { Form } from "react-bootstrap";
import axios from "axios";

class Order extends Component{
    constructor(props){
        super(props)
        this.state={
            validationMessage:"",
            deliveryMethod:'',
            street: "",
            buildingNumber: "",
            city: "",
            postalCode: "",

        }
    }
    changeDelivery(type){
        this.setState({
          deliveryMethod:type
        })
    }
    handleChange = (e) => {
      this.setState({...this.state,
           [e.target.id]: e.target.value });
    }
    render(){
  return(this.props.trigger) ? (
    <div className='order'>

  <Modal.Dialog>
    <Modal.Header >
      <Modal.Title><p>Zamów</p>
      <Form.Select onChange={(e)=>this.changeDelivery(e.target.value)}>
                <option value="">Odbiór</option>
                <option value="0">Osobisty</option>
                <option value="1">Kurier (za pobraniem)</option>
        </Form.Select>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {(this.state.deliveryMethod=="0")?(<div>
      <h2>Odbiór osobisty w punkcie xxx</h2>
    </div>):""}
    {(this.state.deliveryMethod=="1")?(<div>
      <Form>
          <Form.Group className="mb-3" controlId="street">
            <Form.Label>Ulica</Form.Label>
            <Form.Control type="text" onChange={this.handleChange.bind(this)} placeholder="Ulica" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="buildingNumber">
            <Form.Label>Numer budynku</Form.Label>
            <Form.Control type="text" onChange={this.handleChange.bind(this)} placeholder="Numer budynku" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Kod pocztowy</Form.Label>
            <Form.Control type="text" onChange={this.handleChange.bind(this)} placeholder="kod" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Miasto</Form.Label>
            <Form.Control type="text" onChange={this.handleChange.bind(this)} placeholder="Miasto" />
          </Form.Group>
    </Form>
    </div>):""}
      
  </Modal.Body>
  <Modal.Footer>
  		<Button variant="primary" onClick={() => {
            const url = "http://localhost:5232/api/Order/ConfirmOrder";
           
            axios.defaults.withCredentials=true;
            const data ={
              "street": this.state.street,
              "buildingNumber": this.state.buildingNumber,
              "city": this.state.city,
              "postalCode": this.state.postalCode,
              "deliveryType": this.state.deliveryMethod
            }
            console.log(data)
            axios.post(url,data,{
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
            
				  }}>Zamów</Button>
          <Button variant="secondary" onClick={()=> this.setState({displayForm:false,deliveryMethod:''},this.props.setTrigger(false))}>Anuluj</Button>
          </Modal.Footer>
</Modal.Dialog>
       
      </div>) : null;
}}
export default Order
  