import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigFolderService {

  apiUrl: string = 'https://administration-effzardpfsaed0gw.eastus2-01.azurewebsites.net'

  httpClient = inject(HttpClient)

  constructor(private _cookieService: CookieService) { }

  getConfigFoldersByCompanyId(companyId: number) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/folder/configfolder/company/' + companyId, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  getCompaniesByUserId(userId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/user/' + userId + '/companies', { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  getFoldersByFolderConfigId(folderConfigId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/folder/configfolder/' + folderConfigId, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  getAudioResponseByFolderConfigIdAndFolderId(folderConfigId: any, folderId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/folder/' + folderId + '/configfolder/' + folderConfigId + '/audioResponse/csv', { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  addConfigFolder(configFolder: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.post(this.apiUrl + '/api/folder/configfolder', configFolder, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }
}
