import { Component } from "react";
import { Form,Button } from "react-bootstrap";
import "./addCategory.css"

 class ChangeNumber extends Component{
        constructor(props){
            super(props);
            this.state={
                name:''
            }
        }
  
     validateForm() {
      return true;
    }
  
     handleSubmit(event) {
      event.preventDefault();
    }
    handleChange = (e) => {
        this.setState({...this.state,
             [e.target.id]: e.target.value });
      }

  render(){
    return (
      <div className="change">
      <div className="number">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg" >
            <Form.Label>Nazwa</Form.Label>
            <Form.Control
              id="name"
              type="string"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button  size="lg" className="submit" type="submit" disabled={!this.validateForm()}>
            Dodaj
          </Button>
        </Form>
      </div></div>
    );
  }}

  export default ChangeNumber