import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {
    if (localStorage.getItem('Token') === null) {
      document.location.href = '/';
    }

    const navigation = this.router.getCurrentNavigation();
    this.cardsToReview = navigation?.extras.state?.['data'];
  }

  test(a: any) {
    console.log(a.checked);
    
  }
}
