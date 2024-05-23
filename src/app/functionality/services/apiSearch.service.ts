import { Injectable } from '@angular/core';
import JishoAPI from 'unofficial-jisho-api'

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  jishoSearch:JishoAPI = new JishoAPI();

  searchKanji(kanji: string ) {

    this.jishoSearch.searchForKanji(kanji).then(res => {
      console.log(res);
    })
  }

}
