import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  loading = true;
  orders: any
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5232/api/Account/IsUserLogged', { withCredentials: true,
  }).subscribe({
    next: data => {
       if(data.name!="admin"){
        this.router.navigate(['/']);
       }
       
   },
 
 error: error => {
  this.router.navigate(['/Login']);
     
 }})
    this.http.get<any>('http://localhost:5232/api/Order/GetAllOrderedProducts', {withCredentials:true }).subscribe({
      next: data => {
         this.orders = data
         this.loading = false
     },
   
   error: error => {
       console.error('There was an error!', error);
   }})
  }
  getDecimalNumber(num:number){
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  changeStatus(status:any,id:any){
    const headers = {'Content-Type': 'application/json',};
    this.http.post<any>("http://localhost:5232/api/Order/ChangeOrderStatus?orderId="+id+"&status="+status,"",{headers, withCredentials: true }).subscribe({
      next: data => {
          this.ngOnInit()
     },
   
   error: error => {
       console.error('There was an error!', error);
   }})
  }

}
