import { Component } from "react";
import React from 'react';
import { Form,Button } from "react-bootstrap";
import "./login.css"
import axios from 'axios';

 class Login extends Component{
        constructor(props){
            super(props);
            this.state={
                email:'',
                password:'',
                remember:false,
            }
            
        }
      
     validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
     
     handleSubmit(event) {
      event.preventDefault();
      const url = "http://localhost:5232/api/Account/Login";
      const data= {email:this.state.email,password:this.state.password,rememberMe:this.state.remember}
      axios.defaults.withCredentials=true;
      axios.post(url,data,{
                        headers: {
                          'Content-Type': 'application/json',                        
                        },                    
                    }
                )
                .then(res => {      
                     this.props.setAuth(true)  
                     this.props.navigate("/Shop", { replace: true });
                })
                .catch(err => {
                    console.log(err);
                })
    
  
  
  }
    handleChange = (e) => {
        this.setState({...this.state,
             [e.target.id]: e.target.value });
      }
      
    handleChangeCheckbox=(e)=>{
      this.setState({
        remember : e.target.checked
      })
    }

  render(){
    return (
      <div className="LoginBox">
        
      <div className="login">
      <h2>Zaloguj się</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group size="lg" >
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" id="remember"  label="Remember me" onChange={this.handleChangeCheckbox.bind(this)} />
          </Form.Group>
          <Button  size="lg" className="submit" type="submit" value={this.state.remember} disabled={!this.validateForm()}>
            Login
          </Button>
        </Form>
      </div></div>
    );
  }}

  export default Login