import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ConfigPromptService } from '../services/config-prompt.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatTooltipModule, MatSortModule, MatGridListModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterPromptComponent {
  form: FormGroup;
  textSelectFolderConfig: any
  textSelectFolder: any
  textSelectCompany: any
  folderList: any[] = []
  models: any[] = ['gpt-4o-mini', 'gpt-3o-mini', 'gpt-turbo'];
  isUpdatePrompt: boolean = false
  
  constructor(private fb: FormBuilder, private _promptService: ConfigPromptService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _cookieService: CookieService) {
    this.form = fb.group({
      prompt: [this.route.snapshot.paramMap.get('prompt') != null ? this.route.snapshot.paramMap.get('prompt') : '', Validators.required],
      instruction: [this.route.snapshot.paramMap.get('instruction') != null ? this.route.snapshot.paramMap.get('instruction') : '', Validators.required],
      model: ['gpt-4o-mini', Validators.required],
      folders: ['']
    });
      this.textSelectFolderConfig = this.route.snapshot.paramMap.get('textSelectFolderConfig') ? this.route.snapshot.paramMap.get('textSelectFolderConfig') : ''
      this.textSelectFolder = this.route.snapshot.paramMap.get('textSelectFolder') ? this.route.snapshot.paramMap.get('textSelectFolder') : ''
      this.textSelectCompany = this.route.snapshot.paramMap.get('textSelectCompany') ? this.route.snapshot.paramMap.get('textSelectCompany') : ''
      this.isUpdatePrompt = this.route.snapshot.paramMap.get('promptId') ? true : false
    }
    
  ngCancel() : void {
    this.router.navigate(['dashboard/prompts', { textSelectCompany : this.textSelectCompany, textSelectFolder: this.textSelectFolder, textSelectFolderConfig: this.textSelectFolderConfig}])
  }

  ngOnInit() : void {
    this.loadCompaniesByUserId()
  }

  loadCompaniesByUserId() {
    const userId = this._cookieService.get('userId')
    this._promptService.getFoldersByCompanyId(this.textSelectCompany).subscribe({
      next: (data: any) => {
        this.folderList = data.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  promptRegister() {
    const prompt = {
      'prompt': this.form.value.prompt,
      'instruction': this.form.value.instruction,
      'model': this.form.value.model,
      'folderConfigId': this.textSelectFolderConfig,
      'folders': this.form.value.folders
    }
    if (this.route.snapshot.paramMap.get('promptId') != null) {
      const promptId = this.route.snapshot.paramMap.get('promptId')
      this._promptService.updatePrompt(promptId, prompt).subscribe({
        next: (data: any) => {
  
          this._snackBar.open('El prompt fue actualizado con exito.', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          this.router.navigate(['dashboard/prompts', { textSelectFolderConfig: this.textSelectFolderConfig, textSelectCompany: this.textSelectCompany, textSelectFolder: this.textSelectFolder }])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }else {
      this._promptService.addPrompt(prompt).subscribe({
        next: (data: any) => {
  
          this._snackBar.open('El prompt fue registrado con exito.', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          this.router.navigate(['dashboard/prompts', { textSelectFolderConfig: this.textSelectFolderConfig, textSelectCompany: this.textSelectCompany, textSelectFolder: this.textSelectFolder }])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }


}
