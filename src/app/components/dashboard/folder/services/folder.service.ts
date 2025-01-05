import { inject, Injectable } from '@angular/core';
import { Folder } from '../../../../interfaces/folder';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  folderList: Folder[] = []

  httpClient = inject(HttpClient)

  constructor(private _cookieService: CookieService) { }

  getFoldersByCompanyId(companyId: number) {
    const token = this._cookieService.get('access_token')
    console.log('entro token')
    console.log(token)
    console.log(this._cookieService.get('user'))
    return this.httpClient.get('http://localhost:4000/api/folder/company/1', { headers: {
      'Authorization': 'Bearer ' + token
    }})
  }
  
  addFolder(folder: Folder) {
    this.folderList.unshift(folder);
  }
}
