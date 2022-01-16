import './App.css';
import React, { useState,useEffect } from 'react';
import { Routes,Route,useNavigate } from "react-router-dom";
import Navb from './Components/nav';
import Home from './Home';
import {LoginNavigate} from './Components/login/loginNavigate'
import {RegisterNavigate} from './Components/register/registerNavigate';
import Basket from './Components/basket/basket';
import { ShopPage } from './ShopPage';
import Orders from './Components/Orders/orders';
import ChangePassword from "./Components/changePassword/changePassword"
import AdminOrders from './Components/AdminOrders/AdminOrders';
import ProductForm from './Components/AdminOrders/AddProduct/ProductForm';
import AddCategory from './Components/AddCategory/addCategory'
import axios from 'axios';
import { Protected } from './Components/protected';

function App() {
  
const [isAuth,setAuth] = useState(false)
const [isAdmin,setAdmin] = useState(false)
let navigate = useNavigate();

useEffect(() => {
  const url = "http://localhost:5232/api/Account/IsUserLogged";
        axios.get(url,{withCredentials:true})                   
          .then(res => {           
          setAuth(true)
          if(res.data.name=="admin"){
            setAdmin(true)
          }
          })
          .catch(err => {
        
          })
});
  return (
    <div>
 
    <Navb isAuth={isAuth} isAdmin={isAdmin} setAdmin={setAdmin} setAuth={setAuth}/>
    <Routes>
      <Route  path="/" element={<Home/>}/> 
      <Route  path="/Shop"  element={<ShopPage isAuth={isAuth}/>}/>
      <Route  path="/Shop/:page"  element={<ShopPage isAuth={isAuth}/>}/>
      <Route path="/Login" element={<LoginNavigate isAuth={isAuth} setAuth={setAuth} />} />
      <Route path="/Register" element={<RegisterNavigate isAuth={isAuth} setAuth={setAuth}/>} />
      <Route path="/Basket"  element={<Basket navigate={navigate}/>} />
      <Route path="/Orders" element={<Orders/>} />
      <Route path="/ChangePassword" element={<ChangePassword navigate={navigate} />} />
      <Route path="/AdminOrders" element={<AdminOrders isAdmin={isAdmin}/>} />
      <Route path="/ProductForm" element={<Protected navigate={navigate} component="ProductForm" isAdmin={isAdmin}/>} />
    </Routes>
    </div>
  )
}
export default App;
