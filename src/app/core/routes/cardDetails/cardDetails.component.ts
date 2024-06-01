import { CardService } from './../../../functionality/services/card.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Card } from '../../../functionality/types/card';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cardDetails.component.html',
  styleUrl: './cardDetails.component.css',
})
export class CardDetailsComponent implements OnInit {
  cardService = inject(CardService)
  actualCardID: number;
  dialog!: HTMLDialogElement | null
  card!: Card;
  cardArray!: Card[];

  constructor(private route: ActivatedRoute) {
    if (localStorage.getItem('Token') === null) {
      document.location.href = '/';
    }
    this.actualCardID = parseInt(
      <string>this.route.snapshot.paramMap.get('cardID')
    );
  }

  ngOnInit() {
    if (localStorage.getItem('Token') === null) {
      document.location.href = '/';
    }

    this.cardArray = JSON.parse(<string>localStorage.getItem('Cards'));
    this.card = <Card>(
      this.cardArray.find(({ cardID }) => cardID === this.actualCardID)
    );
  }
  
  openModal() {
    this.dialog = document.querySelector('dialog')
    this.dialog?.showModal();
    console.log(this.dialog);
    
  }
  closeModal() {  
    this.dialog?.close()
    console.log(this.dialog);
    
  }

  deleteCard() {
    this.cardService.deleteCard(this.actualCardID.toString()).subscribe(() => {
      localStorage.removeItem('Cards')
      this.cardArray = this.cardArray.filter(card => card !== this.card) 
      localStorage.setItem('Cards',JSON.stringify(this.cardArray));  
      document.location.href = '/manageCards'
    })

  }
}
