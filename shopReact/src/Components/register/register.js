import { Component } from "react";
import { Form,Button } from "react-bootstrap";
import "./register.css"
import axios from 'axios';
 class Register extends Component{
        constructor(props){
            super(props);
            this.state={
                email:'',
                password:'',
                confirmPassword:'',
                name:'',
                surname:'',
                phoneNumber:'',

            }
        }
  
     validateForm() {
       return true
    }
  
     handleSubmit(event) {   //post api
      event.preventDefault();
      const url = "http://localhost:5232/api/Account/Register";
      axios.defaults.withCredentials=true;
      const data= {email:this.state.email,
                  password:this.state.password,
                  name:this.state.name,
                  surname:this.state.surname,
                  phoneNumber:this.state.phoneNumber,
                }
      axios.post(
                   url,
                    data,
                    {
                        headers: {
                          'Content-Type': 'application/json',
                        },                    
                    }
                )
                .then(res => {
                    console.log(`Success` + res.data);
                    this.props.setAuth(true)  
                    this.props.navigate("/", { replace: true });
                })
                .catch(err => {
                    console.log(err);
                })
    



    }
    handleChange = (e) => {
        this.setState({...this.state,
             [e.target.id]: e.target.value });
      }

  render(){
    return (
      <div className="RegisterBox">
      <div className="register">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group size="lg" >
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              required
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              id="password"
              type="password"
              required
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Imię</Form.Label>
            <Form.Control
              id="name"
              type="text"
              value={this.state.name}
              required
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control
              id="surname"
              type="text"
              value={this.state.surname}
              required
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Numer telefonu</Form.Label>
            <Form.Control
              id="phoneNumber"
              type="text"
              value={this.state.phoneNumber}
              required
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Button  size="lg" className="submit" type="submit" disabled={!this.validateForm()}>
            Stwórz konto
          </Button>
        </Form>
      </div></div>
    );
  }}

  export default Register