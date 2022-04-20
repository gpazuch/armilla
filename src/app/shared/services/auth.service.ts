import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;

  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.token = '';
    this.headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
    });
  }

  login(auth: { email: string, password: string }) {
    return this.http.post('/tokens', JSON.stringify(auth), { observe: 'response', headers: this.headers })
      .subscribe((next: any) => {
        if (!!next?.data?.token) {
          this.token = next.data.token;
          this.headers.set('Token', this.token);
        }
      });
  }

  getToken() {
    return this.token;
  }

  getHeaders() {
    return this.headers;
  }
}
