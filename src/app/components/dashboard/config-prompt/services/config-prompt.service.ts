import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigPromptService {

  apiUrl: string = 'https://administration-effzardpfsaed0gw.eastus2-01.azurewebsites.net'
  apiSecurityUrl: string = 'https://securityapp-ewhwevayd3g9cdgk.eastus2-01.azurewebsites.net'

  httpClient = inject(HttpClient)

  constructor(private _cookieService: CookieService) { }

  getPromptsByConfigFolderIdAndFolderId(configFolderId: number, folderId: number) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/folder/prompt/configfolder/' + configFolderId + '/folder/' + folderId, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  getCompaniesByUserId(userId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiSecurityUrl + '/api/user/' + userId + '/companies', { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  getFoldersByCompanyId(companyId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/folder/company/' + companyId, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  addPrompt(prompt: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.post(this.apiUrl + '/api/folder/prompt', prompt, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  updatePrompt(promptId: any, prompt: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.put(this.apiUrl + '/api/folder/prompt/' + promptId, prompt, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  analizeProcessedAudios(folderId: any, model: any, prompt: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.post(this.apiUrl + '/api/folder/' + folderId + '/model/' + model + '/analizeProcessedAudios', prompt, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }
}
