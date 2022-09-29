import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  card: Card = {
    board_name:'',
    Board_type:'',
    STM32Family:'',
    reference:'',
    Status:'',
    Owner:'',
    Needed:'',
    Quantity:0,
    DHL_tracking:'',
    name_Reception:'',
    Date_reception:'',
    etat:false
    };
    submitted = false;
  
    constructor(private cardService: CardService) { }
  
    ngOnInit(): void {
    }
  
    saveCard(): void {
      const data = {
        board_name:this.card.board_name,
        Board_type:this.card.Board_type,
        STM32Family:this.card.STM32Family,
        reference:this.card.reference,
        Status:this.card.Status,
        Owner:this.card.Owner,
        Needed:this.card.Needed,
        Quantity:this.card.Quantity,
        DHL_tracking:this.card.DHL_tracking,
        name_Reception:this.card.name_Reception,
        Date_reception:this.card.Date_reception,
        etat:this.card.etat
      };
      console.log(data)
      this.cardService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => console.error(e)
        });
    }
  
    newCard(): void {
      this.submitted = false;
      this.card = {
        board_name:'',
        Board_type:'',
        STM32Family:'',
        reference:'',
        Status:'',
        Owner:'',
        Needed:'',
        Quantity:0,
        DHL_tracking:'',
        name_Reception:'',
        Date_reception:'',
        etat:false
      };
    }

}
