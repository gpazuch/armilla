import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SinkService {
  public responses: any[];

  constructor(
      private http: HttpClient,
      private auth: AuthService,
  ) {
    this.responses = [];
  }

  addSink(sink: any) {
    const headers = this.auth.getHeaders();

    return this.http.post('/agents', JSON.stringify(sink), {observe: 'response', headers})
        .subscribe(resp => {
          this.responses.push(resp);
        });
  }

  batchCreate(sinks: any[]) {
    //todo
  }

}