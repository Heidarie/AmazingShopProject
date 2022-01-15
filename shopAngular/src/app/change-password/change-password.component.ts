import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password=''
  newPassword=''
  confirmPassword=''
  constructor(private http:HttpClient,private router:Router,) { }

  ngOnInit(): void {
  }
changePassword(){
  const headers = {'Content-Type': 'application/json',};
  
  this.http.post<any>("http://localhost:5232/api/Account/ChangeUserPassword?oldPassword="+this.password+"&newPassword="+this.newPassword,
   {}, { headers,withCredentials: true }).subscribe({
   next: data => {
     
    this.router.navigate(['/']);
  },

error: error => {
    console.error('There was an error!', error);
}})
 }
}

