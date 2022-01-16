import React from 'react'
import {NavLink,useNavigate } from "react-router-dom";
import {Navbar, Container,Form,Nav,NavDropdown, Button} from 'react-bootstrap'
import axios from 'axios';




  const Navb=(props)=> {
    let navigate = useNavigate();
    return (
        <div>

<Navbar bg="dark" variant="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand as = {NavLink} to="/">Sklep-Online</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        <Nav.Link as={NavLink} to="/Shop">Shop</Nav.Link>
      </Nav>
      <Form className="d-flex">
      {props.isAdmin ?(
      <NavDropdown title="Admin panel" id="basic-nav-dropdown">
          <NavDropdown.Item  as={NavLink} to="AdminOrders">Zamówienia</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="ProductForm">Dodaj produkt</NavDropdown.Item>
      </NavDropdown>
      ):(<span></span>)}
      {props.isAuth ?(<>
      <NavDropdown title="Profil" id="basic-nav-dropdown">
          <NavDropdown.Item  as={NavLink} to="Orders">Zamówienia</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="ChangePassword">Zmień hasło</NavDropdown.Item>
      </NavDropdown>
        <Nav.Link as={NavLink} to="/Basket">Koszyk</Nav.Link>
       
          <Button onClick={()=>{
           const url = "http://localhost:5232/api/Account/LogOff";
           axios.defaults.withCredentials=true;
           axios.post(url,{},{
            headers: {
              "X-Requested-With": XMLHttpRequest,
            },                    
                    })
                     .then(res => {
                    
                         props.setAuth(false)
                         props.setAdmin(false)
                         navigate("/", { replace: true });
                     })
                     .catch(err => {
                         console.log(err);
                       
                     })
                    }
        
        }>Wyloguj</Button> </> 
        ):(<>
        <Nav.Link as={NavLink} to="/Login">Login</Nav.Link>
        <Nav.Link as={NavLink} to="/Register">Register</Nav.Link></>
        )}
       
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>

</div>
    )}
    export default Navb