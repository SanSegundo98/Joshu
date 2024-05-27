import { ApiSearchService } from './../../functionality/services/apiSearch.service';
import { Component, HostBinding, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './addCard.component.html',
  styleUrl: './addCard.component.css',
})
export class AddCardComponent {
  @HostBinding('style.display') flex: string = 'flex'
  ApiSearchService = inject(ApiSearchService);

  resSearch: any = null// really dont like it, but its less issues for now

  creds: string | null = null

  ngOnInit() {
    this.creds = localStorage.getItem('Token')
    if (this.creds == null) {
      document.location.href='/login'
    }
  }

  formNewUser = new FormGroup({
    searchbar: new FormControl<string | null>('', { nonNullable: true }),
  });

  onSubmit(word: string | null, event: Event) {
    event.preventDefault();
    this.resSearch = null

    if (word == null) {
      console.log('nuh uh');
    } else {
      this.ApiSearchService.jishoRequest(
        'https://jisho.org/api/v1/search/words?keyword='.concat(word),
        'GET'
      ).subscribe((data) => {
        this.resSearch = data
      });
    }
  }
}
