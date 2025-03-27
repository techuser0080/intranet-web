import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = 'https://securityapp-ewhwevayd3g9cdgk.eastus2-01.azurewebsites.net'

  httpClient = inject(HttpClient)

  constructor() { }

  login(data: any) {
    return this.httpClient.post(this.apiUrl + '/api/user/login', data)
  }
}
