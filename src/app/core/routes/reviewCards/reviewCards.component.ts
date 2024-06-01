import { Component } from '@angular/core';

@Component({
  selector: 'app-review-cards',
  standalone: true,
  imports: [],
  templateUrl: './reviewCards.component.html',
  styleUrl: './reviewCards.component.css',
})
export class ReviewCardsComponent {

  constructor() {
    if (localStorage.getItem('Token') === null) {
      document.location.href='/'
    }
  }


}
