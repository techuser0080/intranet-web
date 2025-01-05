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
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  userRegister() {
    const user = {
      'name': this.form.value.name,
      'lastName': this.form.value.lastName,
      'email': this.form.value.email,
      'password': this.form.value.password,
      'age': this.form.value.age,
      'gender': this.form.value.gender
    }
    this._userService.addUser(user).subscribe({
      next: (data: any) => {

        this._snackBar.open('El usuario fue registrado con exito.', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        this.router.navigate(['dashboard/users'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
