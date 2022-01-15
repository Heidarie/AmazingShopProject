import React,{useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './register';


export function RegisterNavigate(props) {
    let navigate = useNavigate();
    useEffect(() => {
        if(props.isAuth){
            navigate("/", { replace: true });
        }
      });
    
    return (
        <Register setAuth={props.setAuth} navigate = {navigate} />)
}