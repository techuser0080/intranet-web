import { ChangeDetectionStrategy, Component, inject, model, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Folder } from '../../../interfaces/folder';
import { FolderService } from './services/folder.service';
import { CookieService } from 'ngx-cookie-service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'upload-audio',
  standalone: true,
  templateUrl: './upload-audio.component.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, SharedModule, MatGridListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadAudioComponent {
  readonly dialogRef = inject(MatDialogRef<FolderComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly folderId = this.data.folderId
  audios: any
  isSelectedFile: boolean = true
  isUploading: boolean = false

  constructor (private _folderService: FolderService) {
  }
  
  ngUploadAudios() {
    console.log(this.audios)
    this.isUploading = true
    this._folderService.uploadAudiosToFolder(this.folderId, this.audios).subscribe({
      next: (data: any) => {
        this.dialogRef.close()
        console.log(data)
        this.isUploading = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  changeSelectedFile(event: Event) {
    const target = event.target as HTMLInputElement
    this.audios = target.files as FileList
    this.isSelectedFile = false
  }
}

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatTooltipModule, MatSortModule, RouterLink, MatGridListModule],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css'
})
export class FolderComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);

  openDialog(folderId: any): void {
    this.dialog.open(UploadAudioComponent, {
      width: '350px',
      data: {folderId: folderId }
    });
  }

  folderList: any[] = []
  companies: any[] = []
  company: any
  textSelect: number = 1
  
  displayedColumns: string[] = ['id', 'description', 'processedAudios', 'analizedAudios', 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor (private _folderService: FolderService, private _snackBar: MatSnackBar, private _cookieService: CookieService, private _router: ActivatedRoute) {}

  loadFolders(companyId: any) {
    this._folderService.getFoldersByCompanyId(companyId).subscribe({
      next: (data: any) => {
        this.textSelect = companyId
        this.folderList = data.data
        this.dataSource = new MatTableDataSource(this.folderList);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadCompaniesByUserId() {
    const userId = this._cookieService.get('userId')
    this._folderService.getCompaniesByUserId(userId).subscribe({
      next: (data: any) => {
        this.companies = data.data
        this.company = this.companies[0]
        console.log(this._router.snapshot.paramMap.get('textSelected'))
        this.textSelect = this._router.snapshot.paramMap.get('textSelected') ? Number(this._router.snapshot.paramMap.get('textSelected')) : this.company.companyId
        this.loadFolders(this.textSelect)
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

  deleteFolder(folderId: number) {
    this._folderService.deleteFolder(folderId).subscribe({
      next: (data: any) => {
        this.loadFolders(this.textSelect);
        this._snackBar.open('El folder fue eliminado con exito.', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  ngOnInit(): void {
    this.loadCompaniesByUserId();
  }
}
