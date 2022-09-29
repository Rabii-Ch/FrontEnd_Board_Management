import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username!:string
  display=false
  constructor() { }

  ngOnInit(): void {
    this.getCurrentUser()
  }
  getCurrentUser(){
    if(localStorage["user"]){
      this.username = JSON.parse(localStorage["user"]).username
      this.display=true
    }
  }
  logout(){
    localStorage.removeItem("user")
    this.display=false
  }

}
