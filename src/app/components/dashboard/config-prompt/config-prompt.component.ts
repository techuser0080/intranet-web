import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ConfigPromptService } from './services/config-prompt.service';

@Component({
  selector: 'app-config-prompt',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatTooltipModule, MatSortModule, RouterLink],
  templateUrl: './config-prompt.component.html',
  styleUrl: './config-prompt.component.css'
})
export class ConfigPromptComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  promptList: any[] = []
  prompt: any
  folderList: any[] = []
  folder: any
  companies: any[] = []
  company: any
  textSelectFolderConfig: number = 1
  textSelectCompany: number = 1
  textSelectFolder: number = 1
  isAnalizing: boolean = false
  
  displayedColumns: string[] = ['id', 'prompt', 'instruction', 'model', 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor (private _promptService: ConfigPromptService, private _snackBar: MatSnackBar, private _cookieService: CookieService, private _router: ActivatedRoute) {}

  loadPromptsByConfigFolderIdAndFolderId(configFolderId: any, folderId: any) {
    this._promptService.getPromptsByConfigFolderIdAndFolderId(configFolderId, folderId).subscribe({
      next: (data: any) => {
        this.promptList = data.data ? data.data : []
        console.log(this.promptList)
        console.log(data.data)
        this.dataSource = new MatTableDataSource(this.promptList);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadFolders(companyId: any) {
    this._promptService.getFoldersByCompanyId(companyId).subscribe({
      next: (data: any) => {
        this.folderList = data.data
        this.folder = this.folderList[0]
        this.textSelectFolder = this._router.snapshot.paramMap.get('textSelectFolder') ? Number(this._router.snapshot.paramMap.get('textSelectFolder')) : this.folderList[0].folderId
        this.textSelectFolderConfig = this._router.snapshot.paramMap.get('textSelectFolderConfig') ? Number(this._router.snapshot.paramMap.get('textSelectFolderConfig')) : this.prompt.promptId
        this.loadPromptsByConfigFolderIdAndFolderId(this.textSelectFolderConfig, this.textSelectFolder)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadCompaniesByUserId() {
    const userId = this._cookieService.get('userId')
    this._promptService.getCompaniesByUserId(userId).subscribe({
      next: (data: any) => {
        this.companies = data.data
        this.company = this.companies[0]
        this.textSelectFolderConfig = this._router.snapshot.paramMap.get('textSelectFolderConfig') ? Number(this._router.snapshot.paramMap.get('textSelectFolderConfig')) : this.company.companyId
        this.textSelectCompany = this._router.snapshot.paramMap.get('textSelectCompany') ? Number(this._router.snapshot.paramMap.get('textSelectCompany')) : this.company.companyId
        this.loadFolders(this.textSelectCompany)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngAnalizeProcessedAudios(model: any, instruction: any, prompt: any) {
    const promptObject = {
      prompt: prompt,
      instruction: instruction
    }
    this.isAnalizing = true
    this._promptService.analizeProcessedAudios(this.textSelectFolder, model, promptObject).subscribe({
      next: (data: any) => {
        this.isAnalizing = false
        console.log('ok')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadCompaniesByUserId();
  }
}
