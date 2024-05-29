import { CommonModule } from '@angular/common';
import { ApiSearchService } from './../../functionality/services/apiSearch.service';
import { Component, HostBinding, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Card } from '../../functionality/types/card';
import { CardService } from '../../functionality/services/card.service';

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

  resSearch: any = null// really dont like it, but its less issues for now
  searchError: string = '';
  creds: string | null = null

  card: Card = {
    cardID: 0,
    userID: 0,
    example: '',
    toLearn: '',
    translation: ''
  }

  ngOnInit() {
    this.creds = localStorage.getItem('Token')
    if (this.creds == null) {
      document.location.href='/login'
    }
  }

  formSearchHelper = new FormGroup({
    searchbar: new FormControl<string>('', { nonNullable: true }),
  });

  formAddCard = new FormGroup({
    jpWordAdd: new FormControl<string>('', {nonNullable: true}),
    translationAdd: new FormControl<string>('', {nonNullable: true}),
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

    this.card.toLearn = originalWord;
    this.card.translation = translated;
    this.card.example = mnemo;
    this.card.userID = parseInt(<string><unknown>localStorage.getItem('User ID'))

    this.cardService.addNewCard(this.card, <string>localStorage.getItem('User ID')).subscribe((response) => {
         console.log(response);
    });
  }
}
