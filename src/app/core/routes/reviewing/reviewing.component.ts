import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Card } from '../../../functionality/types/card';

@Component({
  selector: 'app-reviewing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviewing.component.html',
  styleUrl: './reviewing.component.css',
})
export class ReviewingComponent {
  cardsToReview: Card[] = [];
  showingExample: boolean = false;
  showingAnswer: boolean = false;
  wrong: number = 0
  right: number = 0

  constructor(private router: Router) {
    if (localStorage.getItem('Token') === null) {
      document.location.href = '/';
    }

    const navigation = this.router.getCurrentNavigation();
    this.cardsToReview = navigation?.extras.state?.['data'];
    console.log(navigation);
    
  }

  fnShowExample(showExChk: HTMLInputElement) {
    console.log(showExChk.checked);
    this.showingExample = showExChk.checked
  }

  fnShowAnswer(showAnsChk: HTMLInputElement) {
    console.log(showAnsChk.checked);
    this.showingAnswer = showAnsChk.checked
  }

  answerRating(value: string){
    if (value === 'good') {
      this.right++
      this.cardsToReview.shift()
      this.showingAnswer = false
      this.showingExample = false
      if (this.cardsToReview.length === 0) {
        const data: NavigationExtras = {state: {right: this.right, wrong: this.wrong, from: '/reviewing'}};
        this.router.navigate(['/reviewCards'],data)
        
      }
    } else {
      this.wrong++
      const again = this.cardsToReview.shift()! 
      this.cardsToReview.push(again)
      this.showingAnswer = false
      this.showingExample = false
    }
  }
}
