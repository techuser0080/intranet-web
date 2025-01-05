import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpClient = inject(HttpClient)

  constructor() { }

  login(data: any) {
    return this.httpClient.post('http://localhost:4001/api/user/login', data)
  }
}
