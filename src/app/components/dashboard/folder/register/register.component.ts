import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FolderService } from '../services/folder.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-folder-register',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatTooltipModule, MatSortModule, MatGridListModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterFolderComponent {
  form: FormGroup;
  isUpdateFolder: any;

  constructor(private fb: FormBuilder, private _folderService: FolderService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _cookieService: CookieService) {
    this.form = fb.group({
      description: [this.route.snapshot.paramMap.get('description') ? this.route.snapshot.paramMap.get('description') : '', Validators.required]
    });
    this.isUpdateFolder = this.route.snapshot.paramMap.get('folderId') ? true : false
  }

  ngCancel() : void {
    this.router.navigate(['dashboard/folders', { textSelected : this.route.snapshot.paramMap.get('companyId')}])
  }

  folderRegister() {
    const textSelected = this.route.snapshot.paramMap.get('companyId') ? this.route.snapshot.paramMap.get('companyId') : ''
    const userId = this._cookieService.get('userId')
    const folder = {
      'creationUserId': userId,
      'companyId': textSelected,
      'description': this.form.value.description
    }
    if (this.route.snapshot.paramMap.get('folderId') != null) {
      const folderId = this.route.snapshot.paramMap.get('folderId')
      this._folderService.updateFolder(folder, folderId).subscribe({
        next: (data: any) => {
  
          this._snackBar.open('El folder fue actualizado con exito.', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          this.router.navigate(['dashboard/folders', { textSelected: textSelected}])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }else {
      this._folderService.addFolder(folder).subscribe({
        next: (data: any) => {
  
          this._snackBar.open('El folder fue registrado con exito.', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          this.router.navigate(['dashboard/folders', { textSelected: textSelected }])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }


}
