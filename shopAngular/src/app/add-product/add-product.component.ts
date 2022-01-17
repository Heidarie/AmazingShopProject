import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  itemType = "New"
  products:any
  categories:any
  name:any
  description:any
  price:any
  amount:any
  photo:any
  category:any
  productId:any
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
    this.http.get<any>('http://localhost:5232/api/Product/GetProductsNamesList', { }).subscribe({
      next: data => {
         this.products = data
     },
   
   error: error => {
       console.error('There was an error!', error);
   }})
   this.http.get<any>('http://localhost:5232/api/Product/GetCategories', { }).subscribe({
     next: data => {
        this.categories = data
    },
  
  error: error => {
      console.error('There was an error!', error);
  }})
  }

  fileChangeEvent(e:any){
    this.photo = e.target.files[0]
  }


  addProduct(){
    if(this.itemType=="New"){
      var formData = new FormData()

        formData.append('name',this.name)
        formData.append('price',this.price)
        formData.append('description',this.description)
        formData.append('stockAmount',this.amount)
        formData.append('category',this.category)
        formData.append('file',this.photo)

      this.http.post<any>('http://localhost:5232/api/Product/AddProduct', formData, { withCredentials: true }).subscribe({
       next: data => {
          this.router.navigate(['/']);
      },
    
    error: error => {
        console.error('There was an error!', error);
    }})
    }
    if(this.itemType=="Exsisting"){
      this.http.post<any>("http://localhost:5232/api/Product/AddProductAmount?id="+this.productId+"&amount="+this.amount,"",
       { withCredentials: true }).subscribe({
        next: data => {
           this.router.navigate(['/']);
       },
     
     error: error => {
         console.error('There was an error!', error);
     }})


    }
  }

}
