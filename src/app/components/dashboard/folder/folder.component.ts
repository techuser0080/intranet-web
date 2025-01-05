import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Folder } from '../../../interfaces/folder';
import { FolderService } from './services/folder.service';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatTooltipModule, MatSortModule, RouterLink],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css'
})
export class FolderComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  folderList: any[] = [];
  
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor (private _folderService: FolderService, private _snackBar: MatSnackBar) {}

  loadFolders() {
    console.log('entro')
    this._folderService.getFoldersByCompanyId(1).subscribe({
      next: (data: any) => {
        this.folderList = data.data
        this.dataSource = new MatTableDataSource(this.folderList);
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
    this.loadFolders();
  }
}
