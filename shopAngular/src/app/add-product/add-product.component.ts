import { Component, OnInit } from '@angular/core';
import CategoriesTest from "../../../../shopReact/src/Test_jsons/Categories.json"
import ProductsTest from "../../../../shopReact/src/Test_jsons/Products.json"

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
