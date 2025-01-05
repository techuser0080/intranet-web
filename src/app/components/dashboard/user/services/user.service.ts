import { inject, Injectable } from '@angular/core';
import { User } from '../../../../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: User[] = []
  
  httpClient = inject(HttpClient)

  constructor(private _cookieService: CookieService) { }

  getUsers() {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get('http://localhost:4001/api/user/all', { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  deleteUser(userId: number) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.delete('http://localhost:4001/api/user/' + userId, { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  addUser(user: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.post('http://localhost:4001/api/user', user, { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }
}
