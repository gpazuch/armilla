import { Injectable } from '@angular/core';
import faker from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  wordsInUse: string[];

  constructor() {
    this.wordsInUse = [];
  }

  createWord(expr: string) {
    const word = this.randomWord(expr);

    return word;
  }

  randomWord(expr: string) {
    let word = '';
    do {
      word = faker.fake(expr);
    } while(this.wordInUse(word));
    return word;
  }

  private wordInUse(word: string) {
    return this.wordsInUse.findIndex(value => value === word) !== -1;
  }
}
