import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  currentCard: Card = {
    board_name: '',
    Board_type: '',
    STM32Family: '',
    reference: '',
    Status: '',
    Owner: '',
    Needed: '',
    Quantity: 0,
    DHL_tracking: '',
    name_Reception: '',
    Date_reception: '',
    etat: false
  };

  message = '';

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  
      this.message = '';
      this.getCard(this.route.snapshot.params["id"]);
  }

  getCard(id: string): void {
    this.cardService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCard = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      board_name: this.currentCard.board_name,
      Board_type: this.currentCard.Board_type,
      STM32Family: this.currentCard.STM32Family,
      reference: this.currentCard.reference,
      Status: this.currentCard.Status,
      Owner: this.currentCard.Owner,
      Needed: this.currentCard.Needed,
      Quantity: this.currentCard.Quantity,
      DHL_tracking: this.currentCard.DHL_tracking,
      name_Reception: this.currentCard.name_Reception,
      Date_reception: this.currentCard.Date_reception,
      etat: status
    };

    this.message = '';

    this.cardService.update(this.currentCard.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentCard.etat = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  updateCard(): void {
    this.message = '';

    this.cardService.update(this.currentCard.id, this.currentCard)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = 'This card was updated successfully!';
        },
        error: (e) => console.error(e)
      });

    // alert("This card was updated successfully!")
    Swal.fire('Success', `Card with ID: ${this.currentCard.id} is updated successfully`, 'success')
    // this.delay(1000);
    this.router.navigate(["/cards"])
  }

}
