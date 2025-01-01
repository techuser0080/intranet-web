import { Injectable } from '@angular/core';
import { Folder } from '../../../../interfaces/folder';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  folderList: Folder[] = []

  constructor(private httpClient: HttpClient) { }

  getFoldersByCompanyId(companyId: number) {
    return this.httpClient.get<Folder[]>('')
  }
  
  addFolder(folder: Folder) {
    this.folderList.unshift(folder);
  }
}
