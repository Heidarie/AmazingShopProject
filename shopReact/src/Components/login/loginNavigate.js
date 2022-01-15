import React,{useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';


export function LoginNavigate(props) {
    let navigate = useNavigate();
    useEffect(() => {
        if(props.isAuth){
            navigate("/", { replace: true });
        }
      });
    
    return (
        <Login setAuth={props.setAuth} navigate = {navigate} />)
}