import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../interfaces/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, MatGridListModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterUserComponent {
  gender: any[] = ['Masculino', 'Femenino'];
  companies: any[] = []
  roles: any[] = []
  textSelectCompany: any
  textSelectRole: any
  form: FormGroup;
  isUpdateUser: any;

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _cookieService: CookieService) {
    this.form = fb.group({
      email: [this.route.snapshot.paramMap.get('email') ? this.route.snapshot.paramMap.get('email') : '', Validators.required],
      password: [''],
      name: [this.route.snapshot.paramMap.get('name') ? this.route.snapshot.paramMap.get('name') : '', Validators.required],
      lastName: [this.route.snapshot.paramMap.get('lastName') ? this.route.snapshot.paramMap.get('lastName') : '', Validators.required],
      gender: [this.route.snapshot.paramMap.get('gender') ? this.route.snapshot.paramMap.get('gender') : '', Validators.required],
      age: [this.route.snapshot.paramMap.get('age') ? this.route.snapshot.paramMap.get('age') : '', Validators.required]
    });
    this.isUpdateUser = this.route.snapshot.paramMap.get('userId') ? true : false
  }

  ngCancel() : void {
    this.router.navigate(['dashboard/users'])
  }

  ngOnInit(): void {
    this.loadCompaniesByUserId()
  }

  loadRolesByCompanyId(companyId: any) {
      this._userService.getRolesByCompanyId(companyId).subscribe({
        next: (data: any) => {
          this.roles = data.data
          this.textSelectRole = this.roles[0].rolId
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  
  loadCompaniesByUserId() {
    const userId = this._cookieService.get('userId')

    if (userId == '1') {
      this._userService.getCompanies().subscribe({
        next: (data: any) => {
          this.companies = data.data
          this.textSelectCompany = this.companies[0].companyId
          console.log(this.textSelectCompany)
          this.loadRolesByCompanyId(this.textSelectCompany)
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      this._userService.getCompaniesByUserId(userId).subscribe({
        next: (data: any) => {
          this.companies = data.data
          this.textSelectCompany = this.companies[0].companyId
          this.loadRolesByCompanyId(this.textSelectCompany)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }

  userRegister() {
    const user = {
      'name': this.form.value.name,
      'lastName': this.form.value.lastName,
      'email': this.form.value.email,
      'password': this.form.value.password,
      'age': this.form.value.age,
      'gender': this.form.value.gender,
      'roleId': this.textSelectRole
    }
    if (this.route.snapshot.paramMap.get('userId') != null) {
      const userId = this.route.snapshot.paramMap.get('userId')
      this._userService.updateUser(user, userId).subscribe({
        next: (data: any) => {
  
          this._snackBar.open('El usuario fue actualizado con exito.', '', {
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
    }else {
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


}
