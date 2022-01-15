import { Component, OnInit } from '@angular/core';
import OrdersTest from "../../../../shopReact/src/Test_jsons/Orders.json"
import {HttpClient} from "@angular/common/http"
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  loading = false;
  orders: any
  constructor(private http:HttpClient) {
   }
   ngOnInit(): void {
    this.http.get<any>('http://localhost:5232/api/Order/GetOrderHistory', {withCredentials:true }).subscribe({
      next: data => {
         console.log(data)
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
