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
    return this.httpClient.get('https://localhost:4001', { headers: {
      'Authorization': this._cookieService.get('access_token')
    }})
  }
  
  addFolder(folder: Folder) {
    this.folderList.unshift(folder);
  }
}
