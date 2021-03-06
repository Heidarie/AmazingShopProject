import { Component } from "react";
import { Form,Button } from "react-bootstrap";
import "./changePassword.css"
import axios from "axios";

 class ChangePassword extends Component{
        constructor(props){
            super(props);
            this.state={
                password:'',
                newPassword:'',
                validationMessage:""
            }
        }
  
   
  
     handleSubmit(event) {
     event.preventDefault()
      const url = " http://localhost:5232/api/Account/ChangeUserPassword?oldPassword="+this.state.password+"&newPassword="+this.state.newPassword;
      axios.defaults.withCredentials=true;
      axios.post(url,{
                                  headers: {
                                    'Content-Type': 'application/json',                        
                                  },                        
                              }
                          )
                          .then(res => { 
                              this.setState({validationMessage:""})
                              this.props.navigate("/",{replace:true})
                          })
                          .catch(err => {
                              console.log(err);
                              
                                alert("Złe hasło")
                              
                          })
                    
                    }
           
       

     
    handleChange = (e) => {
        this.setState({...this.state,
             [e.target.id]: e.target.value });
      }

  render(){
    return (
      <div className="change">
      <div className="password">
        <h2>Zmień hasło</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group size="lg" >
            <Form.Label>Stare hasło</Form.Label>
            <Form.Control
              id="password"
              type="password"
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Nowe hasło</Form.Label>
            <Form.Control
              id="newPassword"
              type="password"
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Button  size="lg" className="submit" type="submit">
            Zmień
          </Button>
        </Form>
      </div></div>
    );
  }}

  export default ChangePassword