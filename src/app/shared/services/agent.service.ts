import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

type Config = { [propName: string]: string };

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  public responses: any[];

  public methods: any;

  constructor(
      private http: HttpClient,
      private auth: AuthService,
  ) {
    this.responses = [];
  }

  addAgent(agent: any) {
    const headers = this.auth.getHeaders();

    return this.http.post('/agents', JSON.stringify(agent), {observe: 'response', headers})
        .subscribe(agent => {
          this.responses.push(agent);
        });
  }

  batchCreate(agents: any[]) {
    //todo
  }

}
