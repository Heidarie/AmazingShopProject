import { Component, OnInit } from '@angular/core';
import OrdersTest from "../../../../shopReact/src/Test_jsons/Orders.json"
import {HttpClient} from "@angular/common/http"
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  loading = false;
  orders: any
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5232/api/Order/GetAllOrderedProducts', {withCredentials:true }).subscribe({
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
  changeStatus(status:any,id:any){
    alert(id+" "+status)
    const headers = {'Content-Type': 'application/json',};
    this.http.post<any>("http://localhost:5232/api/Order/ChangeOrderStatus?orderId="+id+"&status="+status,"",{headers, withCredentials: true }).subscribe({
      next: data => {

     },
   
   error: error => {
       console.error('There was an error!', error);
   }})
  }

}
