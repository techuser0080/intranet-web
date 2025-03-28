import { inject, Injectable } from '@angular/core';
import { Folder } from '../../../../interfaces/folder';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  apiUrl: string = 'https://administration-effzardpfsaed0gw.eastus2-01.azurewebsites.net'

  httpClient = inject(HttpClient)

  constructor(private _cookieService: CookieService) { }

  getFoldersByCompanyId(companyId: number) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/folder/company/' + companyId, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  getCompaniesByUserId(userId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.get(this.apiUrl + '/api/user/' + userId + '/companies', { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  deleteFolder(folderId: number) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.delete(this.apiUrl + '/api/folder/' + folderId, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  updateFolder(folder: any, folderId: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.put(this.apiUrl + '/api/folder/' + folderId, folder, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  addFolder(folder: any) {
    const token = this._cookieService.get('access_token')
    return this.httpClient.post(this.apiUrl + '/api/folder', folder, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }

  uploadAudiosToFolder(folderId: any, audios: FileList) {
    const token = this._cookieService.get('access_token')
    const userId = this._cookieService.get('userId')
    const formData = new FormData()
    formData.append("creationUserId", userId)
    for (let i = 0; i < audios.length; i++) {
      formData.append("files", audios[i])
    }
    console.log(formData)
    return this.httpClient.post(this.apiUrl + '/api/folder/' + folderId + '/uploadAudios', formData, { headers: {
      'Authorization': 'Bearer ' + token
    }, withCredentials: true })
  }
}
