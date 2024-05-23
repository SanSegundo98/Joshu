import { ApiSearchService } from './../../functionality/services/apiSearch.service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './addCard.component.html',
  styleUrl: './addCard.component.css',
})
export class AddCardComponent { 
  ApiSearchService = inject(ApiSearchService);
  resSearch: any;

  searchbar = new FormControl<string | null>('', {nonNullable: true},)


  onSubmit(kanji: string, event: Event) {
    event.preventDefault()

    this.resSearch = this.ApiSearchService.searchKanji(kanji)
    console.log(this.resSearch);
    
  }

}
