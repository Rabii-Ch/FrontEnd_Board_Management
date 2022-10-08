import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = {
    username: '',
    email: '',
    password: '',
    roles: ''
  };
  newUser = false
  message = ""

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const data = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      roles: this.user.roles
    };
    console.log(data)
    this.userService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (this.newUser) {
            this.user = {
              username: '',
              email: '',
              password: '',
              roles: ''
            };
          }else{
            this.router.navigate(["/users"])
          }
        },
        error: (e) => {console.error(e)
        this.message = e.error.message}
      });
  }
}
