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

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  login() {
    console.log(this.form)
    const user = this.form.value.user
    const password = this.form.value.password

    if (user == 'abc' && password == 'abc') {
      this.fakeLogin();
    } else {
      this.errorLogin();
      this.form.reset();
    }
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
