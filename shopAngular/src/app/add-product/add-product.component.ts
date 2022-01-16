import { Component, OnInit } from '@angular/core';


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
  constructor() { }

  ngOnInit(): void {
    this.categories = CategoriesTest
    this.products=ProductsTest
  }

}
