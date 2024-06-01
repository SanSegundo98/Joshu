import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardService } from '../../../functionality/services/card.service';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../../functionality/types/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editCard.component.html',
  styleUrl: './editCard.component.css',
})
export class EditCardComponent {
  cardService = inject(CardService);

  actualCardID: number;
  card: Card = {
    cardID: 0,
    userID: 0,
    example: '',
    toLearn: '',
    translation: ''
  }
  cardArray!: Card[];

  

  constructor(private route: ActivatedRoute) {
    this.actualCardID = parseInt(
      <string>this.route.snapshot.paramMap.get('cardID')
    );
    if (localStorage.getItem('Token') === null) {
      document.location.href = '/';
    }
  }

  formEditCard = new FormGroup ({
    newWord: new FormControl,
    newTranslation: new FormControl,
    newExample: new FormControl,
  })

  public get newWord() {
    return this.formEditCard.get('newWord')
  }
  public get newTranslation() {
    return this.formEditCard.get('newTranslation')
  }
  public get newExample() {
    return this.formEditCard.get('newExample')
  }
  

  ngOnInit() {
    this.cardArray = JSON.parse(<string>localStorage.getItem('Cards'));
    this.card = <Card>(
      this.cardArray.find(({ cardID }) => cardID === this.actualCardID)
    );

    this.newWord?.setValue(this.card.toLearn)
    this.newTranslation?.setValue(this.card.translation)
    this.newExample?.setValue(this.card.example)

  }

  editWord(newWord: string | null | undefined, newTL: string | null | undefined, newExample: string | null | undefined, event: Event) {
    if (newWord !== '') {
      this.card.toLearn = newWord
    }
    if (newTL !== '') {
      this.card.translation = newTL
    }
    if (newExample !== '') {
      this.card.example = newExample
    }
    this.card.userID = parseInt(<string><unknown>localStorage.getItem('User ID'))

    return this.cardService.editCard(this.card, this.card.cardID.toString()).subscribe((response) => {
      localStorage.removeItem('Cards');
      this.cardArray.map(mapCard => mapCard.cardID !== this.actualCardID ? mapCard : this.card)
      localStorage.setItem('Cards', JSON.stringify(this.cardArray));
      document.location.href='/manageCards'       
    })
    


  }
}
