import { CommonModule } from '@angular/common';
import { ApiSearchService } from '../../../functionality/services/apiSearch.service';
import { Component, HostBinding, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Card } from '../../../functionality/types/card';
import { CardService } from '../../../functionality/services/card.service';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './addCard.component.html',
  styleUrl: './addCard.component.css',
})
export class AddCardComponent {
  @HostBinding('style.display') flex: string = 'flex'
  ApiSearchService = inject(ApiSearchService);
  cardService = inject(CardService);

  constructor() {
    if (localStorage.getItem('Token') === null) {
      document.location.href='/'
    }
  }

  resSearch: any = null// really dont like it, but its less issues for now
  searchError: string = '';
  addSuccess: string = '';
  creds: string | null = null

  card: Card = {
    cardID: 0,
    userID: 0,
    example: '',
    toLearn: '',
    translation: ''
  }

  formSearchHelper = new FormGroup({
    searchbar: new FormControl<string>('', { nonNullable: true }),
  });

  formAddCard = new FormGroup({
    jpWordAdd: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    translationAdd: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    exampleAdd: new FormControl<string>('', {nonNullable: true})
  })

  
  public get jpWordAdd() {
    return this.formAddCard.get('jpWordAdd')
  }
  
  public get translationAdd() {
    return this.formAddCard.get('translationAdd')
  }
  
  public get exampleAdd() {
    return this.formAddCard.get('exampleAdd')
  }
  

  searchHelp(word: string | null, event: Event) {
    event.preventDefault();
    this.resSearch = null
    this.searchError = ''

    if (word == null) {
      this.searchError = 'Please, introduce something in the search bar.';
    } else {
      this.ApiSearchService.jishoRequest(
        'https://jisho.org/api/v1/search/words?keyword='.concat(word),
        'GET'
      ).subscribe((data) => {
        this.resSearch = data
      });
    }
  }

  addNewCard(
    originalWord: string | null | undefined,
    translated: string | null | undefined,
    mnemo: string | null | undefined,
    event: Event
  ) {
    event.preventDefault();
    this.addSuccess = ''

    this.card.toLearn = originalWord;
    this.card.translation = translated;
    this.card.example = mnemo;
    this.card.userID = parseInt(<string><unknown>localStorage.getItem('User ID'))

    this.cardService.addNewCard(this.card, <string>localStorage.getItem('User ID')).subscribe((response) => {
         this.addSuccess = 'Card successfully added!',
         localStorage.removeItem('Cards')
         setTimeout(() => {this.addSuccess = ''},2000)
    });
  }
}
