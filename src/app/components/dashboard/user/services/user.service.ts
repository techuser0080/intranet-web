import { inject, Injectable } from '@angular/core';
import { User } from '../../../../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'https://securityapp-ewhwevayd3g9cdgk.eastus2-01.azurewebsites.net'
  
  httpClient = inject(HttpClient)

  constructor(private _cookieService: CookieService) { }

  getUsers() {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/user/all', { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  getRolesByCompanyId(companyId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/user/company/' + companyId + '/roles', { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  getCompaniesByUserId(userId: any) {
    console.log(userId)
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/user/' + userId + '/companies', { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  getCompanies() {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/user/companies', { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  deleteUser(userId: number) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.delete(this.apiUrl + '/api/user/' + userId, { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  updateUser(user: any, userId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.put(this.apiUrl + '/api/user/' + userId, user, { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  addUser(user: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.post(this.apiUrl + '/api/user', user, { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  assignRoleToUser(userId: any, roleId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.post(this.apiUrl + '/api/user/'+ userId + '/assignRole/' + roleId, { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }
}
