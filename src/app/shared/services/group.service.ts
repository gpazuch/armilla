import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public responses: any[];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.responses = [];
  }

  addGroup(group: any) {
    const headers = this.auth.getHeaders();

    return this.http.post('/agent_groups', JSON.stringify(group), {observe: 'response', headers})
        .subscribe(resp => {
          this.responses.push(resp);
        });
  }

  batchCreate(agents: any[]) {
    //todo
  }
}
