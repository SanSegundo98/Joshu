import { Card } from './../../../functionality/types/card';
import { Component, inject } from '@angular/core';
import { CardService } from '../../../functionality/services/card.service';
import { NavigationExtras, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-review-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reviewCards.component.html',
  styleUrl: './reviewCards.component.css',
})
export class ReviewCardsComponent {

  cardService = inject(CardService);
  username: string | null = localStorage.getItem('Username')
  cardsArray: Card[] = []
  toReview: Card[] = [];
  rightToast: number = 0
  wrongToast: number = 0
  fromReviewing: boolean = false

  constructor(private router: Router) {
    if (localStorage.getItem('Token') === null) {
      document.location.href='/'
    }
    const navigation = this.router.getCurrentNavigation();
    const fromReview = navigation?.extras.state
    
    if (fromReview && fromReview?.['from'] === '/reviewing') {
      this.fromReviewing = true
      this.rightToast = fromReview?.['right']
      this.wrongToast = fromReview?.['wrong']
    }
    
  }

  ngOnInit() {
    if (localStorage.getItem('Cards') === null) {
      this.cardService.fetchCardsFromUser(<string>localStorage.getItem('User ID')).subscribe((response) => {
        this.cardsArray = response;
        this.cardsArray.sort((a,b) => -a.cardID - -b.cardID)
        localStorage.setItem('Cards', JSON.stringify(response));  
      })
    } else {
      this.cardsArray = JSON.parse(<string>localStorage.getItem('Cards'))
      this.cardsArray.sort((a,b) => -a.cardID - -b.cardID)      
    }
  }

  toReviewArrayEdit(positionOnArray: number) {
    const card = <Card>(
      this.cardsArray.at(positionOnArray)
    );
    if (!this.toReview.includes(card)) {
      this.toReview.push(card)
    } else {
      this.toReview.splice(this.toReview.indexOf(<Card>this.cardsArray.at(positionOnArray)), 1)
    }    
  }

  sendToReview(btn: HTMLButtonElement, event: Event) {
    if (btn.validity.valid === false) {
      event.preventDefault()      
    } else{
      const cardsToReview: NavigationExtras = {state: {cards: this.toReview}};
      this.router.navigate(['/reviewing'], cardsToReview)
    }

  }

}
