import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  public responses: any[];

  constructor(
      private http: HttpClient,
      private auth: AuthService,
  ) {
    this.responses = [];
  }

  addAgent(agent: any) {
    const headers = this.auth.getHeaders();

    return this.http.post('/agents', JSON.stringify(agent), {observe: 'response', headers})
        .subscribe(resp => {
          this.responses.push(resp);
        });
  }

  batchCreate(agents: any[]) {
    //todo
  }

}
