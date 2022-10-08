import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username!:string
  display=false
  admin=false
  user:any
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }
  async getCurrentUser(){
     if(await localStorage["user"]){
       this.user =JSON.parse(localStorage["user"])
      this.username = this.user.username
      this.display=true
      if (this.user.roles == "Admin"){
        this.admin=true
      }
      
    }
  }
  logout(){
    localStorage.removeItem("user")
    this.display=false
    this.admin=false
    window.location.reload()
  }

}
