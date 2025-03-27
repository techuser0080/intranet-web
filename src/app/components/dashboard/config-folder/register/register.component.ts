import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ConfigFolderService } from '../services/config-folder.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatTooltipModule, MatSortModule, MatGridListModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterConfigFolderComponent {
  form: FormGroup;
  isUpdateFolder: any;

  constructor(private fb: FormBuilder, private _folderConfigService: ConfigFolderService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _cookieService: CookieService) {
    this.form = fb.group({
      description: [this.route.snapshot.paramMap.get('description') ? this.route.snapshot.paramMap.get('description') : '', Validators.required]
    });
    this.isUpdateFolder = this.route.snapshot.paramMap.get('folderId') ? true : false
  }

  ngCancel() : void {
    this.router.navigate(['dashboard/configfolders', { textSelected : this.route.snapshot.paramMap.get('textSelectCompany')}])
  }

  folderRegister() {
    const textSelected = this.route.snapshot.paramMap.get('textSelectCompany') ? this.route.snapshot.paramMap.get('textSelectCompany') : ''
    const configFolder = {
      'companyId': textSelected,
      'description': this.form.value.description
    }
      this._folderConfigService.addConfigFolder(configFolder).subscribe({
        next: (data: any) => {
          this._snackBar.open('El config folder fue registrado con exito.', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          this.router.navigate(['dashboard/configfolders', { textSelectCompany: textSelected }])
        },
        error: (err) => {
          console.log(err)
        }
      })
  }


}
