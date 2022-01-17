import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  loading = false;
  orders: any
  constructor(private http:HttpClient,private router:Router) {
    this.http.get<any>('http://localhost:5232/api/Account/IsUserLogged', { withCredentials: true,
  }).subscribe({
    next: data => {  
   },
  
  error: error => {
     console.error('There was an error!', error);
     this.router.navigate(['/Login']);
  }})
   }
   ngOnInit(): void {
    this.http.get<any>('http://localhost:5232/api/Order/GetOrderHistory', {withCredentials:true }).subscribe({
      next: data => {
         this.orders = data
     },
   
   error: error => {
       console.error('There was an error!', error);
   }})
  }
   getDecimalNumber(num:number){
    return (Math.round(num * 100) / 100).toFixed(2)
  }
 

}
