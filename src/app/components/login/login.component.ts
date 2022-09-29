import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
  };
  username!:string

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    const data = {
      email: this.user.email,
      password: this.user.password,
    };
    // console.log(data)
    this.userService.login(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res));
          window.location.replace("/cards")
        },
        error: (e) => {
          console.error(e)
          // alert("Error occured")
        }
      });   
     
    
  }
 
}
