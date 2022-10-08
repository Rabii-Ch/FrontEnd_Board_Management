import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subject } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  cards?: Card[];
  currentCard: Card = {};
  currentIndex = -1;
  board_name = '';
  roles = '';
  admin = false;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private cardService: CardService,
    private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.retrieveCards();
    this.userRole()
  }

  async retrieveCards(): Promise<void> {
    await this.cardService.getAll()
      .subscribe({
        next: (data) => {
          this.cards = data;
          console.log(data);
          this.dtTrigger.next(null!);
        },
        error: (e) => console.error(e)
      });
  }
  userRole() {
    if (localStorage["user"]) {
      this.roles = JSON.parse(localStorage["user"]).roles
      if (this.roles == "Admin") {
        this.admin = true

      }
    }
  }
  updateList(): void {
    this.cardService.getAll()
      .subscribe({
        next: (data) => {
          this.cards = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCards();
    this.currentCard = {};
    this.currentIndex = -1;
  }

  setActiveCard(card: Card, index: number): void {
    this.currentCard = card;
    this.currentIndex = index;
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  deleteCard(id: any) {
    this.cardService.delete(id)
      .subscribe({
        next: (data) => {
          this.cards = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  reserveCard(id: any) {
    console.log(id)
    if (localStorage["user"]) {
      
    }else{
      this.router.navigate(["/login"])
    }
  }
}
