import { Injectable } from '@angular/core';
import faker from '@faker-js/faker';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

type Config = {[propName: string]: string};

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  responses: any[];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.responses = [];
  }

  addAgent(agent: any) {
    const headers = this.auth.getHeaders();

    return this.http.post('/agents', JSON.stringify(agent), {observe: 'response', headers })
      .subscribe(agent => {
        this.responses.push(agent);
    });
  }

  batchCreate(config: Config) {

  }

  private createAgent(config: Config) {
    const {
      tag_min,
      tag_max,
      count
    } = config;
    return {name: this.generateName(config), tags: {}};
  }

  generateName(config: Config) {
    const { prefix, name, suffix } = config;

    // @ts-ignore
    return `${faker.name[prefix]()}_${faker.name[name]()}_${faker.name[suffix]()}`;
  }

  generateTags(config: any) {

  }

}
