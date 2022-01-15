import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  name = ''
  surname =''
  email = ''
  password = ''
  confirmPassword = ''
  phoneNumber = ''
  ngOnInit(): void {
  }

  register(){
    const headers = {'Content-Type': 'application/json',};
    const body = {email:this.email,
      password:this.password,
      name:this.name,
      surname:this.surname,
      phoneNumber:this.phoneNumber,
    }
    
    this.http.post<any>('http://localhost:5232/api/Account/Register', body, { headers,withCredentials: true }).subscribe({
     next: data => {
        console.log(data)
        this.router.navigate(['/']);
    },
  
  error: error => {
      console.error('There was an error!', error);
  }})
  }
}
