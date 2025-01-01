import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../interfaces/usuario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatGridListModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterUserComponent {
  gender: any[] = ['Masculino', 'Femenino'];
  form: FormGroup;

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router, private _snackBar: MatSnackBar) {
    this.form = fb.group({
      user: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  userRegister() {
    const user: User = {
      user: this.form.value.user,
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      genre: this.form.value.gender,
      age: this.form.value.age
    }

    this._userService.addUser(user);
    this.router.navigate(['/dashboard/users']);
    this._snackBar.open('El usuario fue registrado exitosamente.', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


}
