import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrdersComponent } from './orders/orders.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeNumberComponent } from './change-number/change-number.component';
import { BasketComponent } from './basket/basket.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';


const routes: Routes = [
  {path:'',component: HomeComponent},
   {path:'shop',component: ShopComponent },
   {path:'AdminOrders', component: AdminOrdersComponent},
   {path:'AddProduct', component: AddProductComponent},
   {path:'Orders', component: OrdersComponent},
   {path:'ChangePassword', component: ChangePasswordComponent},
   {path:'ChangeNumber', component: ChangeNumberComponent},
   {path:'Basket', component: BasketComponent},
   {path:'Login', component: LoginComponent},
   {path:'Register', component: RegisterComponent},
   {path:'Refresh', component: NavbarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
