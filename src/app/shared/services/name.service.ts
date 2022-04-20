import { Injectable } from '@angular/core';
import faker from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  namesInUse: string[];

  constructor() {
    this.namesInUse = [];
  }

  createName(expr: string) {
    const name = this.randomName(expr);

    return name;
  }

  randomName(expr: string) {
    let name = '';
    do {
      name = faker.fake(expr);
    } while(this.nameInUse(name));
    return name;
  }

  private nameInUse(name: string) {
    return this.namesInUse.findIndex(value => value === name) !== -1;
  }
}
