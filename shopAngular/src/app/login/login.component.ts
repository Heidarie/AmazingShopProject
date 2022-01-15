import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email =''
  password =''
  constructor(private http:HttpClient,private router:Router,) { }

  ngOnInit(): void {
    
  }
 login(){
  const headers = {'Content-Type': 'application/json',};
  const body = {
    email:this.email,
    password:this.password,
  }
  
  this.http.post<any>('http://localhost:5232/api/Account/Login', body, { headers,withCredentials: true }).subscribe({
   next: data => {
     
    window.location.href='/'
  },

error: error => {
    console.error('There was an error!', error);
}})
 }
}
