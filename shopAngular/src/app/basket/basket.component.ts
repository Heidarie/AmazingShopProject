import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from '@angular/router';
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
  anyChecked = false
  checked:any[] = []
  
  empty= false

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {  
    this.http.get<any>('http://localhost:5232/api/Account/IsUserLogged', { withCredentials: true,
  }).subscribe({
    next: data => {  
   },
  
  error: error => {
     console.error('There was an error!', error);
     this.router.navigate(['/Login']);
  }})  
    this.http.get<any>('http://localhost:5232/api/Order/GetOrderedProducts', {withCredentials:true}).subscribe({
    next: data => {
       this.products = data.products
       this.loading=false
       if(this.products.length==0){
         this.empty=true
       }
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

  getTotalPrice(){
    if(this.checked){
    var price =0;
    this.products.map(x=>price+=x.price * x.amount);
    return price
    }
    return null
  }
  changeCheck(id:any){
    var checkedNumber = 0
   var index = this.checked.findIndex(x=>x.id==id)

    this.checked[index].checked=!this.checked[index].checked
    this.checked.map(x=>{if(x.checked==true){checkedNumber+=1}})
    if(checkedNumber>0){
      this.anyChecked = false
    }
    else{this.anyChecked = true}
  }
  deleteChecked(){
    var checkedItems:any [] = []
    this.products.map((x)=>{if(this.checked.find(y=>y.id === x.id).checked){
      checkedItems.push(x.id)
    }})
    this.http.post<any>('http://localhost:5232/api/Order/DeleteProductsFromBasket', checkedItems,{withCredentials:true}).subscribe({
      next: data => {
        this.router.navigate(['/']);
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
              this.router.navigate(['/Orders']);
     },
     error: error => {
       console.error('There was an error!', error);
   }})
  }
checkForm(){
  if(this.deliveryType=="1"){
    if((this.postal.length==0)||(this.street.length==0)||(this.houseNumber.length==0)||(this.city.length==0)){
      return true
    }
  }
  return false
}
}