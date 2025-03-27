import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;
  hide = true;
  private _snackBar = inject(MatSnackBar);
  loading = false;
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;

  constructor(private _loginService : LoginService, private fb: FormBuilder, private router: Router, private _cookieService: CookieService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  login() {
    const user = {
      'email': this.form.value.email,
      'password': this.form.value.password
    }
    this._loginService.login(user).subscribe({
      next: (data: any) => {
        this._cookieService.set('access_token', data.data.token)
        this._cookieService.set('userId', data.data.userId)
        this._cookieService.set('rol', data.data.rol)
        this.router.navigate(['dashboard'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  errorLogin() {
    this._snackBar.open('Usuario o contraseña invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeLogin() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}
