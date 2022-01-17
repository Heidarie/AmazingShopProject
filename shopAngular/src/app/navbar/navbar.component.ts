import { Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  isLogged = false;
  isAdmin = false
  name=''
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:5232/api/Account/IsUserLogged', { withCredentials: true,
   }).subscribe({
     next: data => {
        this.isLogged=true
        if(data.name=="admin"){
          this.isAdmin=true
        }
        
    },
  
  error: error => {
      console.error('There was an error!', error);
      this.isLogged=false
  }})
 }

logOut(){
  
  this.http.post<any>('http://localhost:5232/api/Account/LogOff', { },{ withCredentials: true }).subscribe({
    next: data => {
      this.router.navigateByUrl('/Refresh', { skipLocationChange: true }).then(() => {
        this.isLogged=false
        this.isAdmin = false
        this.router.navigate(['/']);
    }); 
       
       
      
   },
 
 error: error => {
     console.error('There was an error!', error);
 }})
}
public changeLogged(val:boolean){
  this.isLogged=val

}
}
