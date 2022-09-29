import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  currentUser: User = {
    username: '',
    email: '',
    password: '',
    roles: '',
  };

  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      username: this.currentUser.username,
      email: this.currentUser.email,
      password: this.currentUser.password,
      roles: this.currentUser.roles,
      
    };

    this.message = '';

    this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message ='The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  updateCard(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This card was updated successfully!';
        },
        error: (e) => console.error(e)
      });

    // alert("This card was updated successfully!")
    Swal.fire('Success', `User with ID: ${this.currentUser.id} is updated successfully`, 'success')
    // this.delay(1000);
    this.router.navigate(["/users"])
  }

}
