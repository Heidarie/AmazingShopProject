import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  displayProduct:any
  display = false
  loading = true;
  products:any
  categories:any
  sort = ""
  amount = 1
  category:any= ""
  logged = false
  constructor(private http:HttpClient) { }

  ngOnInit(): void {

  this.http.get<any>('http://localhost:5232/api/Product/Products', { }).subscribe({
     next: data => {
       
        this.products = data
        this.loading = false
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
  
 this.http.get<any>('http://localhost:5232/api/Account/IsUserLogged', { withCredentials: true,}).subscribe({
  next: data => {
    this.logged = true
 },

error: error => {
  
}})



 }
  isLogged(){
     return this.logged
  }
  getCategories(categoryId:any){
    this.http.get<any>('http://localhost:5232/api/Product/GetSelectedCategoryProduct', {
      headers: {
        'Content-Type': 'application/json',                        
      },
      params:{
        categoryId:categoryId
      }}             
  ).subscribe({
    next: data => {
     
       this.products = data
       this.category = categoryId
   },
 
 error: error => {
     console.error('There was an error!', error);
 }})
  }
  changeSort(){
    this.http.get<any>("http://localhost:5232/api/Product/SortProducts?sort="+this.sort+"&categoryId="+this.category, {
      headers: {
        'Content-Type': 'application/json',                        
      }}             
  ).subscribe({
    next: data => {
       this.products = data
   },
 
 error: error => {
     console.error('There was an error!', error);
 }})
  }
  getImage(image:any){
    return `data:image/jpeg;base64,${image}`
  }

  setDisplay(val:boolean,product:any){
    this.display=val
    this.amount= 1
    this.displayProduct = product
  }
  getDecimalNumber(num:number){
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  getMax(product:any){
    return product.stockAmount
  }
  addToBasket(id:any){
  
  const headers = {'Content-Type': 'application/json',}
  this.http.post<any>("http://localhost:5232/api/Order/AddToBasket?productId="+id+"&amount="+this.amount, 
  {}, { headers,withCredentials: true }).subscribe({
   next: data => {
     this.setDisplay(false,'')
    
  },

error: error => {
    console.error('There was an error!', error);
}})
 }
}

