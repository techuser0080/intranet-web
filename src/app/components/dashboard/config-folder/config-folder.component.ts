import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigFolderService } from './services/config-folder.service';

@Component({
  selector: 'app-config-folder',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatTooltipModule, MatSortModule, RouterLink],
  templateUrl: './config-folder.component.html',
  styleUrl: './config-folder.component.css'
})
export class ConfigFolderComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  configFolderList: any[] = []
  companies: any[] = []
  company: any
  textSelectCompany: number = 1
  
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor (private _configFolderService: ConfigFolderService, private _snackBar: MatSnackBar, private _cookieService: CookieService) {}

  loadConfigFolders(companyId: any) {
    this._configFolderService.getConfigFoldersByCompanyId(companyId).subscribe({
      next: (data: any) => {
        this.textSelectCompany = companyId
        this.configFolderList = data.data
        this.dataSource = new MatTableDataSource(this.configFolderList);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadCompaniesByUserId() {
    const userId = this._cookieService.get('userId')
    this._configFolderService.getCompaniesByUserId(userId).subscribe({
      next: (data: any) => {
        this.companies = data.data
        this.company = this.companies[0]
        this.loadConfigFolders(this.company.companyId)
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
