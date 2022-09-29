import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  board_name = '';
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
          this.dtTrigger.next(null!);
        },
        error: (e) => console.error(e)
      });
  }
  updateList(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveCard(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
 delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
 deleteUser(id:any) {
      this.userService.delete(id)
      .subscribe({
         next: (data) => {
          this.users = data;
           console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  

}
