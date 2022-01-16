import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  loading = true
  display = false
  displayProduct:any
  deliveryType :any
  street=''
  houseNumber=''
  postal= ''
  city = ''
  sort = 'none'
  products!: any[]
  checked:any[] = []
  empty= false

  constructor(private http:HttpClient) { }

  ngOnInit(): void {    
    this.http.get<any>('http://localhost:5232/api/Order/GetOrderedProducts', {withCredentials:true}).subscribe({
    next: data => {
       this.products = data.products
       this.loading=false
       this.products.map(x=>this.checked.push({id:x.id,checked:true}))

   },
   error: error => {
     console.error('There was an error!', error);
 }})
  }


  setDisplay(val:boolean,product:any){
    this.display=val
    this.displayProduct = product
  }
  checkAll(){
    
    console.log(this.checked)
  }
  getTotalPrice(){
    if(this.checked){
    var price =0;
    this.products.map(x=>price+=x.price * x.amount);
    return price
    }
    return null
  }
  changeCheck(id:any){
   var index =  this.checked.findIndex(x=>x.id==id)

    this.checked[index].checked=!this.checked[index].checked
  }
  deleteChecked(){
    var checkedItems:any [] = []
    this.products.map((x)=>{if(this.checked.find(y=>y.id === x.id).checked){
      checkedItems.push(x.id)
    }})
    this.http.post<any>('http://localhost:5232/api/Order/DeleteProductsFromBasket', checkedItems,{withCredentials:true}).subscribe({
      next: data => {

     },
     error: error => {
       console.error('There was an error!', error);
   }})
  }
  submitOrder(){
    const data ={
      "street": this.street,
      "buildingNumber": this.houseNumber,
      "city": this.city,
      "postalCode": this.postal,
      "deliveryType": this.deliveryType
    }
    this.http.post<any>('http://localhost:5232/api/Order/ConfirmOrder', data,{withCredentials:true}).subscribe({
      next: data => {
              this.display = false
     },
     error: error => {
       console.error('There was an error!', error);
   }})
  }
}