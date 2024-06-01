import { Component, OnInit, inject } from '@angular/core';
import { CardService } from '../../../functionality/services/card.service';
import { Card } from '../../../functionality/types/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './manageCards.component.html',
  styleUrl: './manageCards.component.css',
})
export class ManageCardsComponent implements OnInit {
  cardService = inject(CardService);
  username: string | null = localStorage.getItem('Username')
  cardsArray: Card[] = []


  constructor() {
    if (localStorage.getItem('Token') === null) {
      document.location.href='/'
    }
  }

  ngOnInit() {
    if (localStorage.getItem('Cards') === null) {
      this.cardService.fetchCardsFromUser(<string>localStorage.getItem('User ID')).subscribe((response) => {
        this.cardsArray = response;
        this.cardsArray.sort((a,b) => a.cardID - b.cardID)
        console.log(this.cardsArray);      
        localStorage.setItem('Cards', JSON.stringify(response));  
      })
    } else {
      this.cardsArray = JSON.parse(<string>localStorage.getItem('Cards'))
      this.cardsArray.sort((a,b) => -a.cardID - -b.cardID)
    }
  }
}
