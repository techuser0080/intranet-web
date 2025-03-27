import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ConfigFolderService } from '../services/config-folder.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [SharedModule, MatTooltipModule, MatToolbarModule, MatGridListModule, MatSortModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  form: FormGroup;
  isUpdateFolder: any;
  companies: any[] = []
  folderList: any[] = []
  folderConfigList: any[] = []
  company: any
  folder: any
  folderConfig: any

  constructor(private fb: FormBuilder, private _folderConfigService: ConfigFolderService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _cookieService: CookieService) {
    this.form = fb.group({
      company: ['', Validators.required],
      folderConfig: ['', Validators.required],
      folder: ['', Validators.required]
    });
  }

  ngOnInit() : void {
    this.loadCompaniesByUserId()
  }

  loadCompaniesByUserId() {
    const userId = this._cookieService.get('userId')
    this._folderConfigService.getCompaniesByUserId(userId).subscribe({
      next: (data: any) => {
        this.companies = data.data
        this.company = this.companies[0].companyId
        this.loadConfigFoldersByCompanyId(this.company)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadConfigFoldersByCompanyId(companyId: any) {
    this._folderConfigService.getConfigFoldersByCompanyId(companyId).subscribe({
      next: (data: any) => {
        this.folderConfigList = data.data
        this.folderConfig = this.folderConfigList[0].folderConfigId
        this.loadFoldersByFolderConfigId(this.folderConfig)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadFoldersByFolderConfigId(folderConfigId: any) {
    this._folderConfigService.getFoldersByFolderConfigId(folderConfigId).subscribe({
      next: (data: any) => {
        this.folderList = data.data
        this.folder = this.folderList[0].folderId
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  downloadAudioResponse() {
      this._folderConfigService.getAudioResponseByFolderConfigIdAndFolderId(this.folderConfig, this.folder).subscribe({
        next: (data: any) => {
          let downloadLink = document.createElement('a')
          downloadLink.href = window.URL.createObjectURL(new Blob([data.data], { type: 'blob'}))
          downloadLink.setAttribute('download', 'reporte.csv')
          document.body.appendChild(downloadLink)
          downloadLink.click()
          this._snackBar.open('El config folder fue registrado con exito.', '', {
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


}
